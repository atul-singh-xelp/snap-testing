const puppeteer = require('puppeteer');
 var LoginElement= require('../data/loginelements.js');

let timeout = 50000;
let browser
let page
let title
let betaurl='https://beta.snaphunt.com';

beforeAll(async() => {
    browser = await puppeteer.launch({
        headless: false,
        slowMo: 250
    })
    page = await browser.newPage();
    
    await page.setViewport({
        width: 1366,
        height: 768
    });
 });

describe('Candidate Login', ()=>{
    it('check Candidate login', async() =>{ 
        await page.goto(betaurl, { waitUntil : ['load', 'domcontentloaded']});
        await page.click('#root > div > div.HomePage > div.HomePage-LeftImageHolderContaint > div > div > div.LeftImageHolder-textHolder > div > div > div > div:nth-child(1) > div > div');
        await page.click('#modal-root > div > div > div.ModalPanel-content > div > div.Auth > div > div.LoginFlow-panelContainer > div > div.SignupPopup-BottomText > span');
        await page.click(LoginElement.emailElement);
        await page.keyboard.type('atu@g.com');        
        await page.click(LoginElement.passwordElement); 
         await page.keyboard.type('123456');     
        await page.click(LoginElement.loginButton);
        await page.waitForSelector(LoginElement.userName);           
        const name= await page.evaluate(()=>{
                   return document.getElementsByClassName('CandidateDashboardHeader-nameContainer')[0].innerText;
       });

       await page.evaluate( ()=>{
           document.getElementsByClassName('App-logOutIcon')[0].click();
       });        
       await page.waitForSelector(LoginElement.homePage);
        expect(name).toBe('Atul Singh K');
    },timeout);
    
    it('check Recruiter login', async() =>{ 
        await page.goto(betaurl, { waitUntil : ['load', 'domcontentloaded']});        
        await page.click('#root > div > div.HomePage > div.HomePage-LeftImageHolderContaint > div > div > div.LeftImageHolder-textHolder > div > div > div > div:nth-child(1) > div > div');
        await page.click('#modal-root > div > div > div.ModalPanel-content > div > div.Auth > div > div.LoginFlow-panelContainer > div > div.SignupPopup-BottomText > span');          
        await page.type(LoginElement.emailElement,'atul@manager.com');        
        await page.type(LoginElement.passwordElement,'admin123');     
        await page.click(LoginElement.loginButton);
        await page.waitForSelector(LoginElement.recruiterMenu);
        await page.click(LoginElement.recruiterProfile);
        await page.waitForSelector(LoginElement.recruiterName);  
        const name= await page.evaluate(()=>{
                   return document.getElementsByClassName('RecruiterInfoHeader-name')[0].innerText;
       });
       await page.evaluate( ()=>{
           document.getElementsByClassName('App-logOutIcon')[0].click();
       });     
        expect(name).toBe('Shivam Kumar');
    },timeout);
 
},timeout);

afterAll( async()=>{
    await page.close();
    await browser.close();
});