/* updates inventory currency
code is needed, and is the currency code
id and name are optional, but only one can be provided
if an id or name id provided only the inventory item matching will be updated
otherwise all items will be updated
*/
const Inventory = require("../models/Inventory")
require("dotenv").config()
const axios = require("axios")
const { ObjectID } = require("mongodb")

//TODO: fix naming and add better comments
//TODO: CHECK IF VALID
//code must exist, id or name but not both
const updateCurrency = async (queryReq) => {
    const updateArray = await getUpdateArray(queryReq)
    const { code: newCurrencyCode, } = queryReq

    const rates = await getRates()
    const returnArray = []
    for(const obj of updateArray){
        const baseCurrencyCode = obj.supplier_details.base_currency_code
        const newRate = rates[newCurrencyCode]
        const oldRate = rates[baseCurrencyCode]
        const newPrice = obj.supplier_details.base_price * (newRate/oldRate)
        obj.details.currency_code = newCurrencyCode
        obj.details.price = Math.round(newPrice*100)/100
        await Inventory.updateOne(
            { _id: ObjectID(obj._id) },
            obj
        )
        returnArray.push(obj)
    }
    return returnArray
}


const getUpdateArray = async (queryReq) => {
    const {  code: newCurrencyCode, id, itemName } = queryReq
    console.log({ newCurrencyCode, id, itemName })
    let updateArray = []
    if(itemName || id ){
        if(itemName){
            const findObj = { item: itemName }
            const invObj = await Inventory.find(findObj)
            updateArray.push(invObj[0])
        }
        else{
            const mongoID = ObjectID(id)
            const invObj = await Inventory.findById(mongoID)
            updateArray.push(invObj)
        }
    }
    else{
        updateArray = await Inventory.find({})
    }

    return updateArray
}


const getRates = async () => {
    //Free key base stuck in EUR, forces me to do basic math
    const api_key = process.env.FIXER_API_KEY
    const response = await axios.get(`http://data.fixer.io/api/latest?access_key=${api_key}`)
    return response.data.rates

    //using memoed to save api calls
    /*    return({ AED: 4.308654,
        AFN: 90.183965,
        ALL: 124.022465,
        AMD: 572.02494,
        ANG: 2.098657,
        AOA: 732.454262,
        ARS: 89.302066,
        AUD: 1.647283,
        AWG: 2.111573,
        AZN: 1.997927,
        BAM: 1.95484,
        BBD: 2.360775,
        BDT: 99.145504,
        BGN: 1.955833,
        BHD: 0.442429,
        BIF: 2259.64291,
        BMD: 1.173096,
        BND: 1.601044,
        BOB: 8.073613,
        BRL: 6.607231,
        BSD: 1.169163,
        BTC: 0.000109,
        BTN: 86.271888,
        BWP: 13.62708,
        BYN: 3.072845,
        BYR: 22992.685745,
        BZD: 2.356777,
        CAD: 1.571116,
        CDF: 2312.172729,
        CHF: 1.080862,
        CLF: 0.033357,
        CLP: 920.411956,
        CNY: 7.985031,
        COP: 4559.766319,
        CRC: 704.722263,
        CUC: 1.173096,
        CUP: 31.08705,
        CVE: 110.207802,
        CZK: 27.163082,
        DJF: 208.148432,
        DKK: 7.446694,
        DOP: 68.233263,
        DZD: 151.561379,
        EGP: 18.516737,
        ERN: 17.596016,
        ETB: 43.161097,
        EUR: 1,
        FJD: 2.505032,
        FKP: 0.915224,
        GBP: 0.915173,
        GEL: 3.929399,
        GGP: 0.915224,
        GHS: 6.769844,
        GIP: 0.915224,
        GMD: 60.764796,
        GNF: 11449.706405,
        GTQ: 9.099284,
        GYD: 244.326321,
        HKD: 9.091554,
        HNL: 28.797318,
        HRK: 7.548521,
        HTG: 123.459508,
        HUF: 365.075735,
        IDR: 17507.874408,
        ILS: 4.043894,
        IMP: 0.915224,
        INR: 86.441585,
        IQD: 1395.825654,
        IRR: 49393.216255,
        ISK: 162.11003,
        JEP: 0.915224,
        JMD: 165.803706,
        JOD: 0.831761,
        JPY: 123.892999,
        KES: 127.163321,
        KGS: 93.376792,
        KHR: 4779.79905,
        KMF: 495.164175,
        KPW: 1055.850733,
        KRW: 1371.150041,
        KWD: 0.359495,
        KYD: 0.974394,
        KZT: 503.108905,
        LAK: 10797.841476,
        LBP: 1768.104924,
        LKR: 216.511857,
        LRD: 233.299517,
        LSL: 20.094914,
        LTL: 3.463848,
        LVL: 0.709594,
        LYD: 1.608817,
        MAD: 10.833316,
        MDL: 19.83616,
        MGA: 4555.759141,
        MKD: 61.583828,
        MMK: 1528.7205,
        MNT: 3342.559958,
        MOP: 9.333656,
        MRO: 418.795753,
        MUR: 46.865268,
        MVR: 18.060831,
        MWK: 880.297614,
        MXN: 26.246914,
        MYR: 4.879676,
        MZN: 84.650689,
        NAD: 20.124445,
        NGN: 450.738918,
        NIO: 40.724559,
        NOK: 11.068456,
        NPR: 138.039533,
        NZD: 1.782145,
        OMR: 0.451652,
        PAB: 1.169308,
        PEN: 4.19694,
        PGK: 4.143267,
        PHP: 56.869319,
        PKR: 193.939996,
        PLN: 4.524456,
        PYG: 8155.654591,
        QAR: 4.271263,
        RON: 4.869169,
        RSD: 117.597001,
        RUB: 92.272265,
        RWF: 1140.438973,
        SAR: 4.399861,
        SBD: 9.56159,
        SCR: 21.093136,
        SDG: 64.901534,
        SEK: 10.53804,
        SGD: 1.6053,
        SHP: 0.915224,
        SLL: 11513.939421,
        SOS: 681.568919,
        SRD: 16.604062,
        STD: 24674.685208,
        SVC: 10.23169,
        SYP: 600.88556,
        SZL: 19.930047,
        THB: 37.149592,
        TJS: 12.071978,
        TMT: 4.117568,
        TND: 3.252414,
        TOP: 2.709324,
        TRY: 9.141464,
        TTD: 7.947775,
        TWD: 34.015057,
        TZS: 2721.58375,
        UAH: 33.09118,
        UGX: 4349.598391,
        USD: 1.173096,
        UYU: 49.731707,
        UZS: 12005.589777,
        VEF: 11.7163,
        VND: 27194.716375,
        VUV: 133.83456,
        WST: 3.072359,
        XAF: 655.60001,
        XAG: 0.049107,
        XAU: 0.000622,
        XCD: 3.170351,
        XDR: 0.831147,
        XOF: 655.600009,
        XPF: 120.465075,
        YER: 293.741324,
        ZAR: 19.869314,
        ZMK: 10559.269174,
        ZMW: 23.442934,
        ZWL: 377.737369 }) */
}


module.exports = updateCurrency