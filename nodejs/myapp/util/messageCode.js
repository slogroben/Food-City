const orderState={
    shopCart:0,
    noPay:1,
    Pay:2,
    finish:3,
    Evaluated:4
}
const stateCode={
    tokenOutTime:-1,
    error:0,
    success:1
}

module.exports={
    orderState,
    stateCode
}