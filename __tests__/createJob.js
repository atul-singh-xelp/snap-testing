const puppeteer = require('puppeteer');
const createJobElements = require('../data/createJobElements');
var LoginElement= require('../data/loginelements.js');
let timeout = 500000;
let browser;
let page;
let betaurl='https://beta.snaphunt.com/login';
let email_id='atul@manager.com';
let pwd='admin123';
const jobName='Atul New Job';

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

describe('Create a new job For Singapore by Recruiter', ()=>{
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
       await page.screenshot({path: 'screenshots/Create_job_login.png', fullPage: true});
       expect(name).toMatch('Atul Singh');
    },timeout);
    it('Create a new Job For without Skills', async()=>{
        await page.click(createJobElements.createjobButton);
        await page.waitForSelector('#root > div > div.App-centeredContainer.ScreenResize > div.MultiForm.MultiForm-progressPosition-top > div.MultiForm-pageHolder > div > div > div > div > div > div > div:nth-child(1) > div.FormComponent-contentContainer > div.FormComponent-content > div > div.JobDetailsForm-lefthalfColumn > div');
        await page.type(createJobElements.jobTitle, jobName); 
        await page.waitFor(500);
        await page.click(createJobElements.SelectRegionForSingapore); //select Singapore Region
        await page.keyboard.type( 'North' ); 
        await page.click(createJobElements.SelectSearchedRegion);//Select  North Region
        await page.waitForSelector('#react-select-11--value > div.Select-input');        
        await page.click(createJobElements.JobTypePerm);
        await page.click(createJobElements.JobEngagementFull);
        await page.click(createJobElements.VisaStatus); //Select Visa Status
        await page.keyboard.type('All Work Visas');
        await page.click(createJobElements.SelectSarchedVisa); // Select All Visa        
        await page.waitForSelector(createJobElements.SelectIndustry);
        await page.click(createJobElements.SelectIndustry); //Select Industry
        await page.keyboard.type('IT');
        await page.click(createJobElements.SelectSearchedIndustry);
        await page.waitForSelector(createJobElements.SelectSector);
        await page.click(createJobElements.SelectSector); //select Sector
        await page.keyboard.type('Software');
        await page.click(createJobElements.SelectSearchedSector);
        await page.waitFor(500);       
        await page.evaluate(()=>{
            window.scrollBy(0, 9999);
        });
        await page.waitFor(500);
        await page.waitForSelector(createJobElements.SelectFunction);
        await page.click(createJobElements.SelectFunction); //Job Function
        await page.keyboard.type('Technology');
        await page.click('#react-select-6--option-0');
    
       await page.waitForSelector(createJobElements.SelectRole);
       await page.click(createJobElements.SelectRole); //Job Roles
       await page.keyboard.type('Database');
       await page.click('#react-select-15--option-0');
        
        await page.click(createJobElements.MinimumSalary);
        await page.keyboard.type("10001"); 
        await page.click(createJobElements.MaxSalary);   
        await page.keyboard.type("100010");
        await page.click('#react-select-8--value > div.Select-input'); //per Annum/Month dropdown
        await page.click('#react-select-8--option-0'); //per Annum
  //      await page.click('#react-select-8--option-1'); //per month        
        await page.click(createJobElements.ThingsMakejobAttractive_StableCompany);
        await page.click(createJobElements.ThingsMakejobAttractive_OpportunitiesToLearn);
        await page.click(createJobElements.ThingsMakejobAttractive_StrongEmployerBrand);
        await page.waitFor(500);
        await page.click(createJobElements.competencies_BuildingRelationships);
        await page.click(createJobElements.competencies_QualityandDetailOrientation);
        await page.click(createJobElements.competencies_Result_Driven);
        await page.click(createJobElements.continue_Button);
        await page.evaluate(()=>{
            window.scrollBy(0, 9999);
        });
       await page.click(createJobElements.continue_Button);
        await page.waitFor(5000);
        const checkheading= await page.evaluate(()=>{
            return document.getElementsByClassName('FormComponent-headerLeft')[0].innerText;
        });
        await page.screenshot({path: 'screenshots/createJob_BasicDetails.png', fullPage: true});
        expect(checkheading).toMatch('The Offer');
        await page.waitFor(5000);          
    },timeout);

    it('check autofill job Description and video Summary page', async()=>{
        await page.waitForSelector('#root > div > div.App-centeredContainer.ScreenResize > div.MultiForm.MultiForm-progressPosition-top > div.MultiForm-pageHolder > div > div > div > div > div:nth-child(4) > div.FormComponent-contentContainer > div.FormComponent-labelContainer > div > span');
        await page.evaluate(()=>{
            window.scrollBy(0, 9999);
        });
        await page.click(createJobElements.continue_Button);
        await page.waitFor(5000); 
        const VIDEO_SUMMARY= await page.evaluate(()=>{
            return document.getElementsByClassName('VideoSummaryForm-title')[0].innerText;
        });
        await page.screenshot({path: 'screenshots/createJob_VideoSummary.png', fullPage: true});
        expect(VIDEO_SUMMARY).toMatch('Upload a Video');
    }, timeout);

    it('check job preview page', async()=>{
        
        await page.click(createJobElements.previewPublish_Button);
        await page.waitFor(5000); 
        const Title_SUMMARY= await page.evaluate(()=>{
            return document.getElementsByClassName('JobAdHeader-managerProfile')[0].innerText;
        });
        await page.screenshot({path: 'screenshots/createJob_PreviewPage.png', fullPage: true});
        expect(Title_SUMMARY).toMatch(jobName);
    }, timeout);

    it('check active button on Job Preview Page', async()=>{
        await page.waitFor(5000);
        const Publish_Button= await page.evaluate(()=>{
            return document.getElementsByClassName('Button Button-iconVisible')[1].innerText;
        });
        const Save_For_Later_Button= await page.evaluate(()=>{
            return document.getElementsByClassName('Button Button-iconVisible')[2].innerText;
        });
        const Edit_Button= await page.evaluate(()=>{
            return document.getElementsByClassName('Button Button-iconVisible')[3].innerText;
        });        
        await page.screenshot({path: 'screenshots/createJob_PrevButtonCheck.png', fullPage: true});
        expect(Publish_Button).toMatch('Publish');
        expect(Save_For_Later_Button).toMatch('Save For Later');
        expect(Edit_Button).toMatch('Edit');
    },timeout);

    it('Publish Job', async()=>{
        await page.click(createJobElements.publishJob_Button);
        await page.click(createJobElements.confirmPublish_Button);
        await page.waitFor(5000);
        await page.click('#modal-root > div > div > div.ModalPanel-content > div > div.JobPublishPopup > div > div.JobPublishPopup-buttonHolder > div');
        await page.waitForSelector('#root > div > div.App-centeredContainer.ScreenResize > div.EmployerDashboard > div.EmployerDashboard-leftSection > div.EmployerDashboard-jobs > div.EmployerDashboard-leftcontainer > div > div:nth-child(2)');
        await page.waitFor(8000);       
        const Published_title= await page.evaluate(()=>{
            return document.getElementsByClassName('Job-role')[0].innerText;
        });
        const Job_Status= await page.evaluate(()=>{
            return document.getElementsByClassName('StatusIndicator StatusIndicator-open')[0].innerText;
        });
        await page.screenshot({path: 'screenshots/CreateJob_Dashboard.png', fullPage: true});
        expect(Published_title).toMatch(jobName);
        expect(Job_Status).toMatch('OPEN');
    },timeout);
});

afterAll( async()=>{
     await page.screenshot({path: 'screenshots/createJob_finish.png', fullPage: true});
     await page.close();
     await browser.close();
 });