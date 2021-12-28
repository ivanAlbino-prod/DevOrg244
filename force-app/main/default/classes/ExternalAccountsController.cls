public with sharing class ExternalAccountsController {
    
    @AuraEnabled(cacheable=true)
    public static List<Account_Ext__x> getExtAccounts(){
     	return [SELECT Id, Name__c,AccountNumber__c,Type__c FROM Account_Ext__x ORDER BY Name__c];
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(){
        return [SELECT Id, Name, Type, AccountNumber FROM Account ORDER BY Name];
    }
}