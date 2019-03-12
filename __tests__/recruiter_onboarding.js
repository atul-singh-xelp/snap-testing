const puppeteer = require('puppeteer');
const recruiterelement = require('../data/recruiteronboardingformelement');
var LoginElement= require('../data/loginelements.js');
let timeout = 500000;
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
    it('Login with newly Onboarded Recruiter', async()=>{
        await page.goto(betaurl, { waitUntil : ['load', 'domcontentloaded']});      
        await page.type(LoginElement.emailElement,recruiterelement.email_id);     
        await page.type(LoginElement.passwordElement,recruiterelement.pwd);     
        await page.click(LoginElement.loginButton);
        await page.waitForSelector('#root > div > div.App-centeredContainer.ScreenResize > div.OnBoardingRecruiter > div > div.OnBoardingRecruiter-personalDetail-header > div > div.RecruiterInfoHeader-dataHolder > div.RecruiterInfoHeader-email');  
        await page.waitFor(5000);
        const name_heading= await page.evaluate(()=>{
                   return document.getElementsByClassName('FormComponent-headerLeft')[0].innerText;
       });
       expect(name_heading).toMatch('Name');
     },timeout);
      
       it('fill recruiter Details', async()=>{      
        await page.click(recruiterelement.Mr_Element);
        await page.keyboard.type('Mr');
        await page.click(recruiterelement.Select_Mr);
        await page.type(recruiterelement.company_designation,'Senior QA');
        await page.type(recruiterelement.companyName, 'Xelpmoc Design & Tech');
        await page.type(recruiterelement.company_DispalyName, 'Xelp');
        await page.focus(recruiterelement.company_Website);
        await page.keyboard.down( 'Control' );
        await page.keyboard.press( 'A' );
        await page.keyboard.up( 'Control' );
        await page.keyboard.press( 'Backspace' );
        await page.keyboard.type('www.xelpmoc.in')
      //  await page.type('#root > div > div.App-centeredContainer.ScreenResize > div > div > div.OnBoardingRecruiter-personalDetail-body > div > div:nth-child(8) > div.FormComponent-contentContainer > div.FormComponent-content > div > div > div > input', 'www.xelpmoc.in');
        await page.type(recruiterelement.company_Address, '#17 Agies Building');
        await page.focus(recruiterelement.company_Pincode);        
        await page.keyboard.down( 'Control' );
        await page.keyboard.press( 'A' );
        await page.keyboard.up( 'Control' );
        await page.keyboard.press( 'Backspace' );
        await page.keyboard.type('560037');
        await page.type(recruiterelement.company_City,'Bangalore');
        await page.screenshot({path: 'screenshots/recruiter_Onboarding_First_Page.png', fullPage: true});      
        await page.waitForSelector(recruiterelement.Next_Button);
        await page.click(recruiterelement.Next_Button);
        const plan_heading= await page.evaluate(()=>{
            return document.getElementsByClassName('OnBoardingRecruiter-planHeading')[0].innerText;
            });
            expect(plan_heading).toMatch('Choose a Plan');
       },timeout); 

       it('Select Pay per Hire Plan', async()=>{
        await page.waitForSelector(recruiterelement.company_PayperHireButton);
        await page.click(recruiterelement.company_PayperHireButton);
        await page.waitForSelector(recruiterelement.company_payperHireConfirm);
        await page.click(recruiterelement.company_payperHireConfirm);
        await page.screenshot({path: 'screenshots/recruiter_Onboarding_Plan_Page.png', fullPage: true});
       },timeout);

       it('fill company Details/profile', async()=>{
        await page.waitForSelector(recruiterelement.company_Description);
        await page.click(recruiterelement.company_Description);
        await page.type(recruiterelement.company_Description, 'Company Description by Company Owner');
        const fileInput = await page.$('input[type=file]');
        await fileInput.uploadFile(recruiterelement.companylogo);
        await page.click(recruiterelement.company_videoLink);
        await page.type(recruiterelement.company_videoLink,'https://www.youtube.com/watch?v=jFGKJBPFdUA');
        await page.click(recruiterelement.corporate_Video);
        await page.screenshot({path: 'screenshots/recruiter_Onboarding_CompanyDetails_Page.png', fullPage: true});
        await page.click(recruiterelement.Next_Button);
        await page.waitForSelector(recruiterelement.hamburger_menu);
        await page.waitFor(5000);
        const dashboard_heading= await page.evaluate(()=>{
            return document.getElementsByClassName('EmployerDashboard-cardHeader')[1].innerText;
            });
            expect(dashboard_heading).toMatch('Latest Applications');
      },timeout);
});

afterAll( async()=>{
    await page.screenshot({path: 'screenshots/Recruiter_onboarding_finish.png', fullPage: true});
    await page.close();
    await browser.close();
});