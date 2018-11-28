const puppeteer = require('puppeteer');
var faker = require('faker');
const SignupElement=require('../data/singupelements');
let timeout = 50000;

let browser
let page
let title
let betaurl='https://beta.snaphunt.com';
let cvpath='cv/AtulSinghcv.pdf';
let Email 

beforeAll(async() => {
    browser = await puppeteer.launch({
        headless: true,
        slowMo: 250
    });
    page = await browser.newPage();
    await page.setViewport({
        width: 1366,
        height: 768
    });
 });
 describe('Signup', ()=>{
    it('Candidate SignUp Submit CV', async()=>{
        Email = faker.name.firstName()+'@'+faker.name.lastName()+'.com';
        await page.goto('https://beta.snaphunt.com/jobseekers');        
        await page.click(SignupElement.candidateSubmityourcvButton);
        await page.type(SignupElement.candidateFirstName,'Atul');
        await page.type(SignupElement.candidateLastName,'Singh');
        await page.type(SignupElement.candidateEmail, Email);
        await page.type(SignupElement.candidatePhoneNo,'98765434');
        await page.type(SignupElement.candidatePassword,'admin123');
        const fileInput = await page.$('input[type=file]');
        await fileInput.uploadFile(cvpath);
        await page.click(SignupElement.candidateTermAndCondition);
        await page.click(SignupElement.candidateSignupButton);
        await page.waitForSelector(SignupElement.candidateVerificationemailSent);
        const Textforpopup = await page.evaluate( ()=>{
            return document.getElementsByClassName('MailSentPopup-textHolder')[0].innerText;
        });

        expect(Textforpopup).toBe('We’ve sent you an email on');
        
    },timeout); 
    
    it('Recruiter SignUp', async()=>{
        Email = faker.name.firstName()+'@'+faker.name.lastName()+'.com';
        await page.goto('https://beta.snaphunt.com/employers');
        await page.waitForSelector(SignupElement.recruiterGetStartedButton);
        await page.click(SignupElement.recruiterGetStartedButton);
        await page.type(SignupElement.recruiterFirstName,'Atul');
        await page.type(SignupElement.recruiterLastName,'Singh');
        await page.type(SignupElement.recruiterEmail, Email);
        await page.type(SignupElement.recruiterPhoneNo,'98765434');
        await page.type(SignupElement.recruiterPassword,'admin123');
        await page.click(SignupElement.recruiterTremAndCondition);
        await page.click(SignupElement.recruiterSignupButton);
        await page.waitForSelector(SignupElement.recruiterEmailVerificationSent);
        const Textforpopup = await page.evaluate( ()=>{
            return document.getElementsByClassName('MailSentPopup-textHolder')[0].innerText;
        });

        expect(Textforpopup).toBe('We’ve sent you an email on');
        
    },timeout);
 },timeout);

 afterAll( async()=>{
    await page.close();
    await browser.close();
});
