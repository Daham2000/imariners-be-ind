import Dao from "../dao";
import UserPaymentModel from "../../models/userPaymentModel";

export default class UserSubsDao extends Dao {
    async changeUserSubscription(userSubModel: UserPaymentModel): Promise<any> {
        const users = await super.query(`SELECT * from Users where uid="${userSubModel.uid}"`);
        if (users.length < 0) {
            throw "Invalid user";
        }
        await super.query(`INSERT INTO UserPayments (uid,payment,paymentCurrency,pay_id,lastPayment) VALUES (
        "${userSubModel.uid}",
        "${userSubModel.payment}",
        "${userSubModel.paymentCurrency}",
        "${userSubModel.pay_id}",
        "${userSubModel.lastPayment}")
        `);
        await super.query(`UPDATE Users SET subscriptionStatus = "${userSubModel.subscription}" where uid="${userSubModel.uid}" `);
        return super.query(`SELECT * from Users where uid="${userSubModel.uid}" `);
    }
}