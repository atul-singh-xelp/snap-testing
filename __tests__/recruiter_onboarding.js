const puppeteer = require('puppeteer');
const recruiterelement = require('../data/recruiteronboardingformelement');
var LoginElement= require('../data/loginelements.js');
let timeout = 50000;
let browser;
let page;
let betaurl='https://beta.snaphunt.com/login';
let companylogo='cv/companylogo.jpg';
const company_Description='#root > div > div.App-centeredContainer.ScreenResize > div > div > div.RecruiterCompanyDetailForm-container > div.RecruiterCompanyDetailForm > div:nth-child(1) > div.FormComponent-contentContainer > div.FormComponent-content > div > div > div.ql-container.ql-snow > div.ql-editor.ql-blank > p';
const Next_Button='#root > div > div.App-centeredContainer.ScreenResize > div > div > div.OnBoardingRecruiter-footer > div > div.FormFooter-right > div:nth-child(2) > div > div.CircleButton-hovered.CircleButton-layer > div > div.Icon-activeImage';
const Company_videoLink='#root > div > div.App-centeredContainer.ScreenResize > div > div > div.RecruiterCompanyDetailForm-container > div.RecruiterCompanyDetailForm > div:nth-child(4) > div.FormComponent-contentContainer > div.FormComponent-content > div > div.RecruiterPersonalDetailForm-inputForVideoAdd > div.RecruiterPersonalDetailForm-inputSaveButtonHolder > div.Input.Input-hollow > input';
const email_id='brielle@beer.com';
const pwd='admin123';

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
        await page.type(LoginElement.emailElement,email_id);     
        await page.type(LoginElement.passwordElement,pwd);     
        await page.click(LoginElement.loginButton);
        await page.waitForSelector('#root > div > div.App-centeredContainer.ScreenResize > div.OnBoardingRecruiter > div > div.OnBoardingRecruiter-personalDetail-header > div > div.RecruiterInfoHeader-dataHolder > div.RecruiterInfoHeader-email');  
        const name= await page.evaluate(()=>{
                   return document.getElementsByClassName('RecruiterInfoHeader-email')[0].innerText;
       });
    },timeout);
      // expect(name).toBe('atul@singh.in');
      it('fill recruiter Details', async()=>{
      
        await page.type('#root > div > div.App-centeredContainer.ScreenResize > div > div > div.OnBoardingRecruiter-personalDetail-body > div > div:nth-child(4) > div.FormComponent-contentContainer > div.FormComponent-content > div > div > div > input','Senior QA');
        await page.type('#root > div > div.App-centeredContainer.ScreenResize > div > div > div.OnBoardingRecruiter-personalDetail-body > div > div:nth-child(5) > div.FormComponent-contentContainer > div.FormComponent-content > div > div > div > input', 'Xelpmoc Design & Tech');
        await page.type('#root > div > div.App-centeredContainer.ScreenResize > div > div > div.OnBoardingRecruiter-personalDetail-body > div > div:nth-child(6) > div.FormComponent-contentContainer > div.FormComponent-content > div > div > div > input', 'Xelp');
        await page.type('#root > div > div.App-centeredContainer.ScreenResize > div > div > div.OnBoardingRecruiter-personalDetail-body > div > div:nth-child(8) > div.FormComponent-contentContainer > div.FormComponent-content > div > div > div > input', 'www.xelpmoc.in');
        await page.type('#root > div > div.App-centeredContainer.ScreenResize > div > div > div.OnBoardingRecruiter-personalDetail-body > div > div:nth-child(9) > div.FormComponent-contentContainer > div.FormComponent-content > div:nth-child(1) > div > div > input', '#17 Agies Building');
        await page.focus('#root > div > div.App-centeredContainer.ScreenResize > div > div > div.OnBoardingRecruiter-personalDetail-body > div > div:nth-child(9) > div.FormComponent-contentContainer > div.FormComponent-content > div:nth-child(3) > div > div.RecruiterPersonalDetailForm-input50 > div > input');
        
        await page.keyboard.down( 'Control' );
        await page.keyboard.press( 'A' );
        await page.keyboard.up( 'Control' );
        await page.keyboard.press( 'Backspace' );

        await page.keyboard.type('560037');
        await page.type('#root > div > div.App-centeredContainer.ScreenResize > div > div > div.OnBoardingRecruiter-personalDetail-body > div > div:nth-child(9) > div.FormComponent-contentContainer > div.FormComponent-content > div:nth-child(3) > div > div.RecruiterPersonalDetailForm-inputLocation > div > input','Bangalore');
       await page.click('#root > div > div.App-centeredContainer.ScreenResize > div > div > div.OnBoardingRecruiter-footer > div > div.FormFooter-right > div:nth-child(2) > div > div.CircleButton-hovered.CircleButton-layer > div > div.Icon-activeImage');
      await page.screenshot({path: 'screenshots/recruiter_Onboarding_First_Page.png', fullPage: true});      
      
      await page.click(Next_Button);
      },timeout); 
      it('Select Pay per Hire Plan', async()=>{
            await page.waitForSelector('#root > div > div.App-centeredContainer.ScreenResize > div > div > div.PaymentPlans > div > div > div:nth-child(3) > div > div > div.PaymentCard-buttonHolder > div > div.PaymentCard-buttonHolder > div');
            await page.click('#root > div > div.App-centeredContainer.ScreenResize > div > div > div.PaymentPlans > div > div > div:nth-child(3) > div > div > div.PaymentCard-buttonHolder > div > div.PaymentCard-buttonHolder > div');
            await page.waitForSelector('#modal-root > div > div > div.ModalPanel-content > div > div.PopUp > div.PopUp-buttonHolder > div > div');
            await page.click('#modal-root > div > div > div.ModalPanel-content > div > div.PopUp > div.PopUp-buttonHolder > div > div');
           
        await page.screenshot({path: 'screenshots/recruiter_Onboarding_Plan_Page.png', fullPage: true});
        // await page.waitForSelector(Next_Button);
        // await page.click(Next_Button); 
      },timeout);

    //   it('fill company Details/profile', async()=>{
    //    await page.waitForSelector(company_Description);
    //    await page.click(company_Description);
    //    await page.type(company_Description, 'Company Description by Company Owner');

    //    const fileInput = await page.$('input[type=file]');
    //    await fileInput.uploadFile(companylogo);

    //    await page.click(Company_videoLink);
    //    await page.type(Company_videoLink,'https://www.youtube.com/watch?v=jFGKJBPFdUA');
    //    await page.click('#root > div > div.App-centeredContainer.ScreenResize > div > div > div.RecruiterCompanyDetailForm-container > div.RecruiterCompanyDetailForm > div:nth-child(4) > div.FormComponent-contentContainer > div.FormComponent-content > div > div.RecruiterPersonalDetailForm-inputForVideoAdd > div.RecruiterPersonalDetailForm-inputSaveButtonHolder > div.RecruiterPersonalDetailForm-inputForVideoAddLinkButton > div > div');
    //    await page.screenshot({path: 'screenshots/recruiter_Onboarding_CompanyDetails_Page.png', fullPage: true});
    //     await page.click(Next_Button);
    //   },timeout);

});


afterAll( async()=>{
    await page.screenshot({path: 'screenshots/Recruiter_onboarding_finish.png', fullPage: true});
    await page.close();
    await browser.close();
});