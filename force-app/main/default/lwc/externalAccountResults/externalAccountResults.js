import { LightningElement, api, track, wire } from 'lwc';
import getExtAccounts from '@salesforce/apex/ExternalAccountsController.getExtAccounts';
import getAccounts from '@salesforce/apex/ExternalAccountsController.getAccounts';
import Type from '@salesforce/schema/Account.Type';

export default class ExternalAccountResults extends LightningElement {

    @track
    extAccs; 
    @track
    accounts;
    @track
    tableData;
    @api type = "External Accounts";

    extAccList = [];
    accList = [];
    extObjList = [];
    acctObjList = [];

    columns = [
        {label: 'Account Number', fieldName: 'AccountNumber__c'},
        {label: 'Name', fieldName: 'Name__c'},
        {label: 'Account Type', fieldName: 'Type__c'}
    ];

    @wire(getExtAccounts)
    wiredExtAcc({data,error}){
        if(data){
            this.extAccs = data;
        }else if(error){
            console.log('data.error');
            console.error(error);
        }
    }

    @wire(getAccounts)
    wiredGetAcc({data,error}){
        if(data){
            this.accounts = data;
            this.process();
        }else if(error){
            console.log('data.error');
            console.error(error);
        }
    }

    process(){
        console.log('process');
        this.extAccList = JSON.parse(JSON.stringify(this.extAccs));
        this.accList = JSON.parse(JSON.stringify(this.accounts));
        this.extAccList.forEach((element) =>{
            console.log('element ->' , element);
            this.accList.forEach((item) => {
                console.log('item ->' , item);
                if(element.Name__c === item.Name){
                    this.extObjList.push(element);
                    this.acctObjList.push(item);
                }
            });
        });
        console.log(this.extObjList);
        if(this.type === 'External Accounts'){
            this.tableData = this.extObjList;
        }else{
            this.columns = [
                {label: 'Account Number', fieldName: 'AccountNumber'},
                {label: 'Name', fieldName: 'Name'},
                {label: 'Account Type', fieldName: 'Type'}
            ];
            this.tableData = this.acctObjList;
        }
    }

}