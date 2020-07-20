const fetch = require("node-fetch");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const getMerchantsAPI = (cc) => {
    let url;
    switch (cc) {
        case 'AU':
            url = 'http://api.shopback.com.au/api/v2/stores';
            break;
        case 'MY':
            url = 'http://api.shopback.my/api/stores';
            break;
        case 'SG':
            url = 'http://api.shopback.sg/api/stores';
            break;
        default:
    }

    return url.toString();
};

const getCouponsAPI = (cc, merchantId) => {
    let url;
    switch (cc) {
        case 'AU':
            url = `http://api.shopback.com.au/api/v2/coupons/merchant/${merchantId}?spell=nox`;
            break;
        case 'MY':
            url = `http://api.shopback.my/api/v2/coupons/merchant/${merchantId}?spell=nox`;
            break;
        case 'SG':
            url = `http://api.shopback.sg/api/v2/coupons/merchant/${merchantId}?spell=nox`;
            break;
        default:
    }

    return url.toString();
};

const csvWriter = (cc) => createCsvWriter({
    path: `${cc}Coupons.csv`.toString(),
    header: [
      {id: 'merchantId', title: 'Merchant Id'},
      {id: 'merchantName', title: 'Merchant Name'},
      {id: 'isCouponMerchant', title: 'Is Coupon Merchant'},
      {id: 'canAutoApply', title: 'Can Auto Apply'}
    ]
});

const getCouponMerchantsByCountry = (cc) => {
    console.log(cc);
    let couponMerchants = [];
    return fetch(getMerchantsAPI(cc))
    .then(response => response.json())
    .then((json) => {
        return json.reduce((result, merchant) => {
            let merchantId = merchant.id;
            const merchantName = merchant.name;
            if ('merchantId' in merchant) {
                merchantId = merchant.merchantId
            }
            const fetchOptions = {
                retryOnHttpStatus: [500, 502, 503, 504]
            };
            return result.then((resultList) => 
                fetch(getCouponsAPI(cc, merchantId), fetchOptions)
                .then(couponResponse => couponResponse.json())
                .then((couponJson) => {
                    let data = {
                        merchantId,
                        merchantName,
                        isCouponMerchant: false,
                        canAutoApply: false
                    };
                    if (couponJson.data) {
                        console.log(merchantId);
                        data.isCouponMerchant = true;
                        if (couponJson.data.canAutoApply) {
                            data.canAutoApply = true;
                        }
                    }
                    resultList.push(data);
                    return resultList;
                })
                .catch((error) => {
                    console.log(error);
                    return resultList;
                })
            );
        }, Promise.resolve(couponMerchants));
    })
    .catch(error => console.log(error));
}

const getAllCountryCouponMerchants = (ccs) => 
    Promise.all(ccs.map(async (cc) => {
        let result = {};
        result[cc] = await getCouponMerchantsByCountry(cc)
        return result;
    }));

const ccs = ['AU', 'SG', 'MY'];
getAllCountryCouponMerchants(ccs)
.then((allCouponMerchants) => {
    allCouponMerchants.map((couponMerchants) => {
        Object.keys(couponMerchants).forEach((cc) => {
            csvWriter(cc)
            .writeRecords(couponMerchants[cc])
            .then(()=> console.log('The CSV file was written successfully'))
            .catch(error => console.log(error));
        });
    });
})
.catch(error => console.log(error));
