const puppeteer = require('puppeteer');
const recruiterelement = require('../data/recruiteronboardingformelement');
var LoginElement= require('../data/loginelements.js');
let timeout = 50000;
let browser;
let page;
let betaurl='https://beta.snaphunt.com/login';

beforeAll(async() => {
    browser = await puppeteer.launch({
        headless: false,
        slowMo: 250
    });
    page = await browser.newPage();
    await page.setViewport({
        width: 1366,
        height: 768
    });
 });

describe('recruiter onboarding process', ()=>{
    it('check onboarding complete', async()=>{
        await page.goto(betaurl, { waitUntil : ['load', 'domcontentloaded']});      
        await page.type(LoginElement.emailElement,'atul@singh.in');     
        await page.type(LoginElement.passwordElement,'admin123');     
        await page.click(LoginElement.loginButton);
        await page.waitForSelector('#root > div > div.App-centeredContainer.ScreenResize > div.OnBoardingRecruiter > div > div.OnBoardingRecruiter-personalDetail-header > div > div.RecruiterInfoHeader-dataHolder > div.RecruiterInfoHeader-email');  
        const name= await page.evaluate(()=>{
                   return document.getElementsByClassName('RecruiterInfoHeader-email')[0].innerText;
       });
    },timeout);
      // expect(name).toBe('atul@singh.in');
      it('fill recruiter Details', async()=>{
    //    await page.click('#react-select-8--value > div.Select-placeholder');
     //    await page.type('#react-select-8--value > div.Select-placeholder', 'Mr');
    //   const atu=  await page.evaluate( ()=>{
    //        return (document.getElementsByClassName('Select-menu-outer')[0]);
    //     });
    
        await page.type('#root > div > div.App-centeredContainer.ScreenResize > div > div > div.OnBoardingRecruiter-personalDetail-body > div > div:nth-child(4) > div.FormComponent-contentContainer > div.FormComponent-content > div > div > div > input','Senior QA');
        await page.type('#root > div > div.App-centeredContainer.ScreenResize > div > div > div.OnBoardingRecruiter-personalDetail-body > div > div:nth-child(5) > div.FormComponent-contentContainer > div.FormComponent-content > div > div > div > input', 'Xelpmoc Design & Tech');
        await page.type('#root > div > div.App-centeredContainer.ScreenResize > div > div > div.OnBoardingRecruiter-personalDetail-body > div > div:nth-child(6) > div.FormComponent-contentContainer > div.FormComponent-content > div > div > div > input', 'Xelp');
        await page.type('#root > div > div.App-centeredContainer.ScreenResize > div > div > div.OnBoardingRecruiter-personalDetail-body > div > div:nth-child(8) > div.FormComponent-contentContainer > div.FormComponent-content > div > div > div > input', 'www.xelpmoc.in');
        await page.type('#root > div > div.App-centeredContainer.ScreenResize > div > div > div.OnBoardingRecruiter-personalDetail-body > div > div:nth-child(9) > div.FormComponent-contentContainer > div.FormComponent-content > div:nth-child(1) > div > div > input', '#17 Agies Building');
        await page.type('#root > div > div.App-centeredContainer.ScreenResize > div > div > div.OnBoardingRecruiter-personalDetail-body > div > div:nth-child(9) > div.FormComponent-contentContainer > div.FormComponent-content > div:nth-child(3) > div > div.RecruiterPersonalDetailForm-input50 > div > input', '560037');
        await page.type('#root > div > div.App-centeredContainer.ScreenResize > div > div > div.OnBoardingRecruiter-personalDetail-body > div > div:nth-child(9) > div.FormComponent-contentContainer > div.FormComponent-content > div:nth-child(3) > div > div.RecruiterPersonalDetailForm-inputLocation > div > input','Bangalore');
        await page.click('#root > div > div.App-centeredContainer.ScreenResize > div > div > div.OnBoardingRecruiter-footer > div > div.FormFooter-right > div:nth-child(2) > div > div.CircleButton-hovered.CircleButton-layer > div > div.Icon-activeImage');

      },timeout); 
    //    await page.evaluate( ()=>{
    //        document.getElementsByClassName('App-logOutIcon')[0].click();
    //    });       
});


afterAll( async()=>{
    await page.screenshot({path: 'digg.png', fullPage: true});
    await page.close();
    await browser.close();
});