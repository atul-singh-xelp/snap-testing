const puppeteer = require('puppeteer');
const createJobElements = require('../data/createJobElements');
var LoginElement= require('../data/loginelements.js');

let timeout = 500000;
let browser;
let page;
let betaurl='https://beta.snaphunt.com/login';
let email_id='atul@manager.com';
let pwd='admin123';

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

describe('Create a new job by Recruiter', ()=>{
    it('Recruiter Login', async()=>{
        await page.goto(betaurl, { waitUntil : ['load', 'domcontentloaded']});      
        await page.type(LoginElement.emailElement,email_id);     
        await page.type(LoginElement.passwordElement,pwd);     
        await page.click(LoginElement.loginButton);
        await page.waitForSelector(LoginElement.recruiterMenu);
        await page.click(LoginElement.recruiterProfile);
        await page.waitForSelector(LoginElement.recruiterName);  
        const name= await page.evaluate(()=>{
                   return document.getElementsByClassName('RecruiterInfoHeader-name')[0].innerText;
       });
       expect(name).toBe('Shivam Kumar');
    },timeout);
    it('Create a new Job by Menu', async()=>{
        await page.click(createJobElements.createjobButton);
        await page.waitForSelector('#root > div > div.App-centeredContainer.ScreenResize > div.MultiForm.MultiForm-progressPosition-top > div.MultiForm-pageHolder > div > div > div > div > div > div > div:nth-child(1) > div.FormComponent-contentContainer > div.FormComponent-content > div > div.JobDetailsForm-lefthalfColumn > div');
        // await page.type(createJobElements.jobTitle, "Atul");
        // await page.click(createJobElements.JobTypePerm);
        // await page.click(createJobElements.JobEngagementFull);
        // await page.type(createJobElements.MinimumSalary, "10001"); 
        // await page.type(createJobElements.MaxSalary,"100010");      
     //  await page.click('#react-select-5--value > div.Select-input'); //location-Singapore
     //await page.click('#react-select-11--value > div.Select-input'); //select Sector
    // await page.click('#react-select-6--value > div.Select-input'); //Job Function
   // await page.click('#react-select-7--value > div.Select-input'); //Currency Type
   //  await page.click('#react-select-8--value > div.Select-input'); //per Annum/Month
  // await page.click('#react-select-12--value > div.Select-input'); //Select Languages
        await page.waitFor(500);

        await page.click('#react-select-9--value > div.Select-input'); //select Region
        await page.focus('#react-select-6--value > div.Select-placeholder');
        await page.keyboard.type( 'North' ); 
        await page.click('#root > div > div.App-centeredContainer.ScreenResize > div.MultiForm.MultiForm-progressPosition-top > div.MultiForm-pageHolder > div > div > div > div > div > div > div:nth-child(4) > div.FormComponent-contentContainer > div.FormComponent-content > div > div.JobDetailsForm-righthalfColumn > div > div > div.Select-menu-outer');//Select  North Region
        await page.waitForSelector('#react-select-11--value > div.Select-input');
        
        await page.click('#react-select-14--value > div.Select-input'); //Select Visa Status
        await page.focus('#react-select-11--value > div.Select-placeholder');
        await page.keyboard.type('All Work Visas');
        await page.click('#root > div > div.App-centeredContainer.ScreenResize > div.MultiForm.MultiForm-progressPosition-top > div.MultiForm-pageHolder > div > div > div > div > div > div > div:nth-child(5) > div.FormComponent-contentContainer > div.FormComponent-content > div > div > div > div.Select-menu-outer'); // Select All Visa
        
        await page.waitForSelector('#react-select-10--value > div.Select-input');
        await page.click('#react-select-10--value > div.Select-input'); //Select Industry
        await page.keyboard.type('IT');
        await page.click('#root > div > div.App-centeredContainer.ScreenResize > div.MultiForm.MultiForm-progressPosition-top > div.MultiForm-pageHolder > div > div > div > div > div > div > div:nth-child(6) > div.FormComponent-contentContainer > div.FormComponent-content > div > div.MultiDropDown-Row > div > div:nth-child(1) > div > div > div.Select-menu-outer');

        await page.waitForSelector('#react-select-11--value > div.Select-input');
        await page.click('#react-select-11--value > div.Select-input'); //select Sector
        await page.keyboard.type('Software');
        await page.click('#root > div > div.App-centeredContainer.ScreenResize > div.MultiForm.MultiForm-progressPosition-top > div.MultiForm-pageHolder > div > div > div > div > div > div > div:nth-child(6) > div.FormComponent-contentContainer > div.FormComponent-content > div > div.MultiDropDown-Row > div > div:nth-child(2) > div > div > div.Select-menu-outer');

  //      await page.waitForSelector('#react-select-6--value > div.Select-input');
        await page.click('#react-select-6--value > div.Select-input'); //Job Function
        await page.keyboard.type('Techno');
        await page.click('#root > div > div.App-centeredContainer.ScreenResize > div.MultiForm.MultiForm-progressPosition-top > div.MultiForm-pageHolder > div > div > div > div > div > div > div:nth-child(7) > div.FormComponent-contentContainer > div.FormComponent-content > div > div.JobDetailsForm-lefthalfColumn > div > div > div.Select-menu-outer');
        



        await page.waitFor(500000);
    
  //  await page.click(regionElement);
   
         
        
       
       
      // await page.keyboard.type('Per Annum');
      //  await page.click('#react-select-5--value > div.Select-input');
      //  await page.type('#react-select-5--value > div.Select-input', "Per Annum");
    },timeout);

});

afterAll( async()=>{
     await page.screenshot({path: 'screenshots/createJob_finish.png', fullPage: true});
     await page.close();
     await browser.close();
 });