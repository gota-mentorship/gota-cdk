import { Stack, StackProps } from 'aws-cdk-lib'
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb'
import { Construct } from 'constructs'

export class GotaCdkStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props)
        this.setUpDynamodb()
    }

    private setUpDynamodb() {
        const defaults: dynamodb.TableProps = {
            partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
            sortKey: { name: 'created_at', type: dynamodb.AttributeType.NUMBER },
            // free tier (billingMode && readCapacity && writeCapacity)
            billingMode: dynamodb.BillingMode.PROVISIONED,
            readCapacity: 25,
            writeCapacity: 25,
        }
        new dynamodb.Table(this, 'UsersTable', { tableName: 'Users', ...defaults })
        new dynamodb.Table(this, 'MentorshipsTable', { tableName: 'Mentorships', ...defaults })
    }
}
