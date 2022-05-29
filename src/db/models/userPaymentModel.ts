interface UserPaymentModel{
    payment? : number;
    subscription? : string;
    uid? : number;
    paymentCurrency? : string;
    pay_id? : string;
    lastPayment? : string;
}

export default UserPaymentModel;