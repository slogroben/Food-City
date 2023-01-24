//订单类型
const orderState={
    shopCart:0,
    noPay:1,
    Pay:2,
    finish:3,
    Evaluated:4
}

//返回的状态码
const stateCode={
    tokenOutTime:-1,
    error:0,
    success:1,
    null:2
}
//返回的状态信息
const stateMsg={
    tokenOutTime:'token过期',
    error:'出现错误',
    success:'请求成功',
    null:'信息为空'
}
//店铺状态
const shopstate={
    review:0,//审核中
    operate:1,//成功入驻
    quit:2,//已经退出入驻
    isquit:3,//退出申请中
    reject:4//入驻被拒绝
}

const userType={
    root:0,
    seller:1,
    Normal:2
}
module.exports={
    orderState,
    stateCode,
    stateMsg,
    shopstate,
    userType
}