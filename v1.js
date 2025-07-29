//VERSION 4.0.0

// SIN





const NA = "9"; //place



const fs = require('fs');

const axios = require('axios');

const { Builder, By, Key, until } = require('selenium-webdriver');

const chrome = require('selenium-webdriver/chrome');



const readline = require('readline');

const Jimp = require('jimp');

const username = 'LILMAX';

const apikey = '8PAcj0csaLnf3djh6MFr';

const http = require('http');







/////////////////////////////////////////////////////////////////////////////////

const mail1 = ('madocheatis3@gmail.com');

const password1 = ('Teamnomade@12');

const name1 = ('bado'); //prenom

const lastName1 = ('bianca'); //nom

const SeriePaspo1 = ('R11884538');

const NUT1 = ('7249999');







function resumeAllTasks() {

    console.log('▶️ Triggering continuation of all tasks...');

    continuePromiseResolve();

}





const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

let continuePromiseResolve;

let continuePromise = new Promise(resolve => {

    continuePromiseResolve = resolve;

});

















async function openManualLoginTask(taskName, loginScript, postLoginScript) {

    let options = new chrome.Options();





    options.addArguments('--incognito');

    options.addArguments('--no-sandbox');

    options.addArguments('--disable-gpu');

    options.addArguments('--disable-dev-shm-usage');

    options.addArguments('--window-size=1280,720');



    let driver = await new Builder()

        .forBrowser('chrome')

        .setChromeOptions(options)

        .build();



    try {

        await driver.get('https://citas.sre.gob.mx');



        // Auto login

        await loginScript(driver);



        console.log(`🔒 [${taskName}] Logged in. Waiting for trigger...`);

        await continuePromise;



        console.log(`▶️ [${taskName}] Proceeding...`);

        await postLoginScript(driver);



        await driver.sleep(300000); // Keep tab open

        await driver.quit();



    } catch (err) {

        console.error(`[${taskName}] Error:, err`);

    }

}



(async () => {



    // Task 1

    openManualLoginTask('Task 1', async (driver) => {



        await driver.executeScript("document.body.style.zoom='80%'");







        const firstClick = By.xpath("//label[contains(text(), ' Correo electrónico y contraseña')]");

        await driver.wait(until.elementLocated(firstClick), 60000);

        await driver.findElement(firstClick).click();









        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        //login



        const inputSelectorx = By.css('input[name="email"]'); // Replace with your actual input selector

        await driver.wait(until.elementLocated(inputSelectorx), 60000);

        const inputx = await driver.findElement(inputSelectorx);

        await inputx.sendKeys(mail1); // Type into the input

        console.log('clicked');





        const inputSelectory = By.css('input[name="password"]'); // Replace with your actual input selector

        await driver.wait(until.elementLocated(inputSelectory), 60000);

        const inputy = await driver.findElement(inputSelectory);

        await inputy.sendKeys(password1); // Type into the input

        console.log('password typed successfully!');



        const check = By.xpath("//p[contains(text(), 'He leido y acepto los')]");

        await driver.wait(until.elementLocated(check), 60000);

        await driver.findElement(check).click();







        const firstclick4 = By.css('body > div:nth-child(3) > div > main > div > div > div > div > div.background > div:nth-child(2) > div:nth-child(2) > div > div > div > div > div > div > div > a > span > svg');

        await driver.wait(until.elementLocated(firstclick4), 10000);

        await sleep(1000);

        await driver.findElement(firstclick4).click();



        const firstclick5 = By.xpath("//button[contains(@class, 'btn') and contains(@class, 'primary') and .//font[text()='Ingresar']]");

        await driver.wait(until.elementLocated(firstclick5), 60000);

        await driver.findElement(firstclick5).click();

        console.log('ingresar clicked');







        //robot

        // Take screenshot of CAPTCHA element

        await sleep(200);

        console.log('captcha premye esè');



        let captcha2 = await driver.wait(until.elementLocated(By.css('body > div:nth-child(3) > div > main > div > div > div > div > div.background > div:nth-child(2) > div:nth-child(3) > div > div > div > div > div > center > img')), 30000);

        await driver.sleep(300);

        let image2 = await captcha2.takeScreenshot(true);

        fs.writeFileSync('captcha.png', image2, 'base64');

        await driver.sleep(1000);









        const starttime = Date.now()

        await (async () => {





            const imageBase64 = fs.readFileSync('captcha.png', { encoding: 'base64' });



            const payload = {

                userid: username,

                apikey: apikey,

                data: imageBase64

            };



            const response = await axios.post('https://api.apitruecaptcha.org/one/gettext', payload, {

                headers: { 'Content-Type': 'application/json' }

            });



            if (response.data.result) {

                console.log('✅ Captcha Text:', response.data.result);

                const text = response.data.result;



                const cleanedText = text

                    .replace(/\s+/g, '')                     // remove all spaces

                    .split('')

                    .map(char => {

                        if (char === 'P') return 'P';        // keep P uppercase

                        if (char === 'o' || char === 'O') return '0'; // convert o/O to 0

                        return char.toLowerCase();           // everything else to lowercase

                    })

                    .join('');



                console.log('Clean text:', cleanedText);





                let captchaInput = await driver.findElement(By.name('name'));

                await captchaInput.sendKeys(cleanedText);





            } else {

                console.error('❌ Failed:', response.data);

            }

        })()

            .catch(error => {

                console.error('❌ Error:', error.response?.status, error.response?.data || error.message);

            });













        const aceptarBtn1b = await driver.wait(until.elementLocated(By.xpath("//button[normalize-space()='Aceptar']")), 60000);

        await driver.wait(until.elementIsVisible(aceptarBtn1b), 1000000);

        console.log('acceptar fouded');

        await driver.sleep(100);

        await aceptarBtn1b.click();

        console.log('Aceptar clicked!');

        console.log('CAPTCHA answer sent and form submitted!');









        console.log('first try done');









        //look for error

        let i = 0;

        let imax = 30;



        while (i < imax) {

            try {

                const errLocator = By.css('.alert.alert-danger.alert-dismissible');



                // Wait until the error alert is present (max 5s)

                await driver.wait(until.elementLocated(errLocator), 7000);

                console.log('❌ Error detected.');



                // Get the alert element

                const errElement = await driver.findElement(errLocator);



                // Get its full visible text

                const errText = await errElement.getText();



                // Clean result

                const message = errText.trim();



                console.log('⚠️ Error message:', message);



                if (message.includes('Usuario y/o contraseña no válidos.')) {

                    console.log('❌Itilizatè inkorèk');



                    await driver.quit();

                }

                else if (message.includes('¡Atención! El Captcha no es correcto')) {

                    console.log('❌captcha inkorèk');

                    console.log('robot, reyesè #', i + 1);

                    await driver.sleep(1000);



                    const croix = (By.css('button.close'));

                    await driver.wait(until.elementLocated(croix), 2000);

                    console.log('founded');

                    await driver.findElement(croix).click();

                    await driver.sleep(500);

                    await driver.findElement(firstclick5).click();





                    //robot

                    // Take screenshot of CAPTCHA element

                    await sleep(200);

                    const starttime = Date.now()

                    let captcha2 = await driver.wait(until.elementLocated(By.css('body > div:nth-child(3) > div > main > div > div > div > div > div.background > div:nth-child(2) > div:nth-child(3) > div > div > div > div > div > center > img')), 50000);

                    let image2 = await captcha2.takeScreenshot(true);

                    fs.writeFileSync('captcha.png', image2, 'base64');









                    await (async () => {





                        const imageBase64 = fs.readFileSync('captcha.png', { encoding: 'base64' });



                        const payload = {

                            userid: username,

                            apikey: apikey,

                            data: imageBase64

                        };



                        const response = await axios.post('https://api.apitruecaptcha.org/one/gettext', payload, {

                            headers: { 'Content-Type': 'application/json' }

                        });



                        if (response.data.result) {

                            console.log('✅ Captcha Text:', response.data.result);

                            const text = response.data.result;



                            const cleanedText = text

                                .replace(/\s+/g, '')                     // remove all spaces

                                .split('')

                                .map(char => {

                                    if (char === 'P') return 'P';        // keep P uppercase

                                    if (char === 'o' || char === 'O') return '0'; // convert o/O to 0

                                    return char.toLowerCase();           // everything else to lowercase

                                })

                                .join('');



                            console.log('Clean text:', cleanedText);





                            let captchaInput = await driver.findElement(By.name('name'));

                            await captchaInput.sendKeys(cleanedText);





                        } else {

                            console.error('❌ Failed:', response.data);

                        }

                    })()

                        .catch(error => {

                            console.error('❌ Error:', error.response?.status, error.response?.data || error.message);

                        });





                    const aceptarBtn1b = await driver.wait(until.elementLocated(By.xpath("//button[normalize-space()='Aceptar']")), 60000);

                    await driver.wait(until.elementIsVisible(aceptarBtn1b), 1000000);

                    console.log('acceptar fouded');

                    await driver.sleep(100);

                    await aceptarBtn1b.click();

                    console.log('Aceptar clicked!');

                    console.log('CAPTCHA answer sent and form submitted!');











                } else if (message.includes('¡Atención! Se identifico un comportamiento sospechoso por lo que no podrás acceder al sistema durante')) {

                    console.log('kont bloke ❌kont bloke, chanje user yo api relanse anko');



                    await driver.quit();

                }



            } catch (e) {

                console.log(e);



                break;



            }

            i++;

        }











        const endtime = Date.now();

        const T = (endtime - starttime) / 1000;

        console.log('time:', T);















        const croix2 = By.css('body > div:nth-child(3) > div.container > div:nth-child(1) > div > div > div > div > div > div > div > div > div > a > span > svg');

        await driver.wait(until.elementLocated(croix2), 120000);

        console.log('konekte🟢');









        await sleep(1000);

        await driver.findElement(croix2).click();

        console.log('croix clicked');

        console.log('ready');









    }, async (driver) => {



        await driver.executeScript("document.body.style.zoom='100%'");



        const starttime = Date.now();

        let i = 0;

        const imax = 10;

        const B = By.css("body > div:nth-child(3) > div.container > div:nth-child(3) > div:nth-child(4) > a");



        while (i < imax) {

            try {



                await driver.wait(until.elementLocated(B), 3000);

                await driver.findElement(B).click();

                console.log("✅ First button clicked");

            } catch (e) {

                console.log("❌ Button not found on attempt #", i + 1);

                break;

            }

            console.log("Tried #", i + 1);

            await driver.sleep(1000);

            i++;

        }





        const A0 = By.css(".card");

        await driver.wait(until.elementLocated(A0), 90000);

        console.log('card founded');











        await sleep(200);

        const selector0 = By.xpath("//a[contains(text(), 'Seleccionar')]");

        await driver.wait(until.elementLocated(selector0), 60000);

        await driver.findElement(selector0).click();

        // await driver.evaluate(() => window.scrollTo(0, 1378)); // Scroll to the right position



        await sleep(200);

        const selector = By.xpath("//button[contains(text(), 'Aceptar')]");

        await driver.wait(until.elementLocated(selector), 60000);

        await driver.findElement(selector).click();







        //  await driver.evaluate(() => window.scrollTo(0, 2065)); // Scroll to the right position

        await driver.executeScript("window.scrollTo(0, 346.53125);");



        const last = By.xpath("//a[contains(text(), 'Agregar Manualmente')]");

        await driver.wait(until.elementLocated(last), 60000);

        await driver.findElement(last).click();











        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



        const inputSelector = By.css('input[name="name"]'); // Replace with your actual input selector

        await driver.wait(until.elementLocated(inputSelector), 60000);

        const input = await driver.findElement(inputSelector);

        await input.sendKeys(name1); // Type into the input

        console.log('first name typed successfully!');





        const inputSelector1 = By.css('input[name="firstName"]'); // Replace with your actual input selector

        await driver.wait(until.elementLocated(inputSelector1), 60000);

        const input1 = await driver.findElement(inputSelector1);

        await input1.sendKeys(lastName1); // Type into the input

        console.log('last name typed successfully!');











        // Click the birthdate input to open the calendar

        const birthdateInput = await driver.findElement(By.name('birthdate'));

        await birthdateInput.click();



        const yearDropdown = await driver.wait(until.elementLocated(By.css('.ui-datepicker-year')), 10000);

        await driver.sleep(200); // small pause to allow options to load



        const options = await yearDropdown.findElements(By.css('option'));

        for (let option of options) {

            const text = await option.getText();

            if (text === '1986') {

                await option.click();

                break;

            }

        }





        const days = await driver.findElements(By.css('.ui-datepicker-calendar a'));

        for (let day of days) {

            const text = await day.getText();

            if (text.trim() === '16') {

                await day.click();

                break;

            }

        }









        //sex

        const selector4a = By.css('.v-select[name="cat_gender_id"] .vs__dropdown-toggle');

        await driver.wait(until.elementLocated(selector4a), 60000);

        await driver.findElement(selector4a).click();



        const selector4b = By.css('.vs__dropdown-option');

        await driver.wait(until.elementsLocated(selector4b), 60000);

        await driver.sleep(300);

        const option = await driver.findElements(selector4b);

        await option[1].click();





        //nationalidad

        const selector5a = By.css('.v-select[name="cat_nationality_id"] .vs__dropdown-toggle');

        await driver.wait(until.elementLocated(selector5a), 60000);

        await driver.findElement(selector5a).click();



        await sleep(300);

        const selector5b = By.css('.vs__dropdown-option');

        await driver.wait(until.elementLocated(selector5b), 60000);

        const option2 = await driver.findElements(selector5b);

        await option2[83].click();



        //etat civille

        const selector6a = By.css('.v-select[name="civilState"] .vs__dropdown-toggle');

        await driver.wait(until.elementLocated(selector6a), 60000);

        await driver.findElement(selector6a).click();





        const selector6b = By.css('.vs__dropdown-option');

        await driver.wait(until.elementLocated(selector6b), 60000);

        await sleep(300);

        const option3 = await driver.findElements(selector6b);

        await option3[0].click();



        //another country

        const dropdowns = await driver.wait(until.elementsLocated(By.name('country_id')), 10000);



        // Choose the second one (index 1)

        const targetDropdown = dropdowns[1];

        console.log('found');

        // Click to open it

        await targetDropdown.click();







        const selector7b = By.css('.vs__dropdown-option');

        await sleep(300);

        await driver.wait(until.elementLocated(selector7b), 60000);

        const option4 = await driver.findElements(selector7b);

        await option4[89].click();





        // departement       

        await driver.wait(until.elementLocated(By.css('body > div:nth-child(3) > div.container > div:nth-child(3) > div > div > div > div:nth-child(2) > div:nth-child(1) > form > div:nth-child(6) > div > div > div > div:nth-child(3) > form > div:nth-child(5) > div:nth-child(2) > div > div > label')), 40000);



        console.log('waited');



        await sleep(300);

        await driver.executeScript(() => {

            const element = document.evaluate(

                '/html/body/div[2]/div[3]/div[3]/div/div/div/div[2]/div[1]/form/div[3]/div/div/div/div[3]/form/div[5]/div[2]/div/div/div/div/div[1]/input',

                document,

                null,

                XPathResult.FIRST_ORDERED_NODE_TYPE,

                null

            ).singleNodeValue;



            if (element) {

                // Disable blocking overlays

                const blocker = document.querySelector('#navbarMainCollapse');

                if (blocker) blocker.style.pointerEvents = 'none';





                // Scroll & interact

                element.scrollIntoView({ behavior: 'smooth', block: 'center' });



                setTimeout(() => {

                    try {

                        element.click();

                        element.focus();





                        // Trigger synthetic events

                        element.dispatchEvent(new Event('input', { bubbles: true }));

                        element.dispatchEvent(new Event('change', { bubbles: true }));



                        console.log('Value set!');

                    } catch (e) {

                        console.error('Error:', e);

                    }

                }, 500);

            } else {

                console.log('Element not found');

            }

        });







        const selector8b = By.css('.vs__dropdown-option');

        await driver.wait(until.elementLocated(selector8b), 60000);

        const option5 = await driver.findElements(selector8b);

        await option5[21].click();



        // ville

        const villeElement = await driver.findElement(By.css('.form-group > .form-group > .form-group > .form-control'));

        await villeElement.sendKeys('petion ville', Key.ENTER);





        const spanSelector = By.css('body > div:nth-child(3) > div.container > div:nth-child(3) > div > div > div > div:nth-child(2) > div:nth-child(1) > form > div:nth-child(6) > div > div > div > div:nth-child(3) > form > div:nth-child(7) > div > span');

        await driver.wait(until.elementsLocated(spanSelector), 60000);

        console.log("displayed");



        const selector9 = By.css('.btn:nth-child(2)');

        await driver.wait(until.elementsLocated(selector9), 60000);

        await driver.findElement(selector9).click();

        console.log("first step passed");

        const endtime = Date.now();

        const T = (endtime - starttime) / 1000;

        console.log('time:', T);









        await sleep(500);

        const selector11 = By.xpath("//label[contains(., 'Visas')]");

        await driver.wait(until.elementLocated(selector11), 60000);

        await sleep(500);

        await driver.findElement(selector11).click();

        console.log('visas cliked');







        // clicking agregar

        await sleep(300);

        const selector11a = By.xpath("//button[contains(text(), 'Agregar')]");

        await driver.wait(until.elementLocated(selector11a), 60000);

        await driver.findElement(selector11a).click();





        //type de visa

        //type de visa
        await sleep('500');
        const dropdownToggle = await driver.findElement(By.name('name'));
        await dropdownToggle.click();

        await sleep(1000);

        // Wait for options to appear
        await driver.wait(until.elementsLocated(By.css('[role="option"], .vs__dropdown-option, .vs__dropdown-menu div')), 60000);

        // Get all options
        const options6 = await driver.findElements(By.css('[role="option"], .vs__dropdown-option, .vs__dropdown-menu div'));

        // Loop through and click the matching text
        for (const option6 of options6) {
            const text = await option6.getText();
            if (text.trim() === 'Con permiso del INM (Validación vía servicio web con el INM)') {
                await option6.click();
                break;
            }
        }
        console.log('con permiso clicked');

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        const passportnumber = await driver.wait(until.elementsLocated(By.name('passportNumber')), 60000);
        // Choose the second one (index 1)
        const targetpassport = passportnumber[0];
        console.log('found');
        await targetpassport.sendKeys(SeriePaspo1);


        const nut = await driver.wait(until.elementsLocated(By.name('passportNumber')), 10000);
        const targetnut = nut[1];
        await targetnut.sendKeys(NUT1);


        const soubmitthat = await driver.wait(until.elementLocated(By.xpath("//button[contains(text(), 'Continuar')]")), 60000);
        await soubmitthat.click();
        await sleep(2000);
        if (soubmitthat) {
            await soubmitthat.click();
        }


        console.log("second step passed");





        console.log("second step passed");





        //identidad

        await sleep(3000);

        console.log('waited');

        const selector13 = By.css('.v-select[name="doc_probatorio_id"] .vs__dropdown-toggle');

        console.log('foud2');

        await driver.wait(until.elementLocated(selector13), 60000);

        console.log('waited2');

        await driver.findElement(selector13).click();



        //CHOOSE

        const selector14 = By.css('.vs__dropdown-option');

        await driver.wait(until.elementsLocated(selector14), 60000);

        await driver.sleep(500);

        const option1 = await driver.findElements(selector14);

        await option1[0].click();









        // ID NUMBER

        const id = await driver.wait(until.elementLocated(By.name('value_1')), 60000);

        console.log('find id');

        await id.sendKeys('1214438415');



        //built date

        const date1 = await driver.findElement(By.name('value_2'));

        await date1.click();



        //year

        const yearDropdown1 = await driver.wait(until.elementLocated(By.css('.ui-datepicker-year')), 60000);

        await driver.sleep(500); // small pause to allow options to load



        const options2 = await yearDropdown1.findElements(By.css('option'));

        for (let option2 of options2) {

            const text2 = await option2.getText();

            if (text2 === '1987') {

                await option2.click();

                break;

            }

        }

        //month

        const yearDropdown1a = await driver.wait(until.elementLocated(By.css('.ui-datepicker-month')), 60000);

        await driver.sleep(500); // small pause to allow options to load



        const options2a = await yearDropdown1a.findElements(By.css('option'));

        for (let option2a of options2a) {

            const text2a = await option2a.getText();

            if (text2a === 'Feb') {

                await option2a.click();

                break;

            } //0 for junuary

        }



        //day

        const days2a = await driver.findElements(By.css('.ui-datepicker-calendar a'));

        for (let day2a of days2a) {

            const text2a = await day2a.getText();

            if (text2a.trim() === '16') {

                await day2a.click();

                break;

            }

        }



        await sleep(1000);





        //built date second 

        const date1b = await driver.findElement(By.name('value_3'));

        await date1b.click();



        //year

        const yearDropdown1b = await driver.wait(until.elementLocated(By.css('.ui-datepicker-year')), 60000);

        await driver.sleep(500); // small pause to allow options to load



        const options2b = await yearDropdown1b.findElements(By.css('option'));

        for (let option2b of options2b) {

            const text2b = await option2b.getText();

            if (text2b === '1987') {

                await option2b.click();

                break;

            }

        }

        //month

        const yearDropdown1ab = await driver.wait(until.elementLocated(By.css('.ui-datepicker-month')), 60000);

        await driver.sleep(500); // small pause to allow options to load



        const options2ab = await yearDropdown1ab.findElements(By.css('option'));

        for (let option2ab of options2ab) {

            const text2ab = await option2ab.getText();

            if (text2ab === 'Feb') {

                await option2ab.click();

                break;

            } //0 for junuary

        }



        //day

        const days2ab = await driver.findElements(By.css('.ui-datepicker-calendar a'));

        for (let day2ab of days2ab) {

            const text2ab = await day2ab.getText();

            if (text2ab.trim() === '16') {

                await day2ab.click();

                break;

            }

        }



        await sleep(1000);



        const pay = await driver.wait(until.elementLocated(By.name('value_4')), 60000);

        await pay.sendKeys('HAITI');



        const soubmit = await driver.wait(until.elementLocated(By.xpath("//button[contains(text(), 'Continuar')]")), 60000);

        await soubmit.click();



        //last step

        //last country

        const lastcountry = await driver.wait(until.elementLocated(By.name('country_id')), 60000);

        await lastcountry.click();



        const lastcountrya = By.css('.vs__dropdown-option');

        await driver.wait(until.elementLocated(lastcountrya), 60000);

        await sleep(500);

        const option10 = await driver.findElements(lastcountrya);

        await option10[89].click();





        //last state

        await driver.wait(until.elementLocated(By.css('#up > form > div:nth-child(3) > div:nth-child(1) > div > div:nth-child(2) > div:nth-child(2) > div > label')), 10000);

        await sleep(500);

        await driver.executeScript(() => {

            const element1 = document.evaluate(

                '/html/body/div[2]/div[3]/div[3]/div/div/div/div[2]/div[1]/form/div[1]/div[1]/div/div[2]/div[2]/div/div/div/div[1]/input',

                document,

                null,

                XPathResult.FIRST_ORDERED_NODE_TYPE,

                null

            ).singleNodeValue;



            if (element1) {

                // Disable blocking overlays

                const blocker = document.querySelector('#navbarMainCollapse');

                if (blocker) blocker.style.pointerEvents = 'none';





                // Scroll & interact

                element1.scrollIntoView({ behavior: 'smooth', block: 'center' });



                setTimeout(() => {

                    try {

                        element1.click();

                        element1.focus();





                        // Trigger synthetic events

                        element1.dispatchEvent(new Event('input', { bubbles: true }));

                        element1.dispatchEvent(new Event('change', { bubbles: true }));



                        console.log('Value set!');

                    } catch (e) {

                        console.error('Error:', e);

                    }

                }, 500);

            } else {

                console.log('Element not found');

            }

        });





        const selectors = By.css('.vs__dropdown-option');

        await driver.wait(until.elementLocated(selectors), 60000);

        const option11 = await driver.findElements(selectors);

        await option11[25].click();





        const direction = await driver.wait(until.elementLocated(By.name('direction')), 10000);

        await direction.sendKeys('petion ville');



        const name = await driver.wait(until.elementLocated(By.name('name')), 10000);

        await name.sendKeys('job');



        const firstName = await driver.wait(until.elementLocated(By.name('firstName')), 10000);

        await firstName.sendKeys('atilus');





        // Wait for the input to appear

        await driver.wait(until.elementLocated(By.name('phone')), 10000);



        // Use executeScript to dispatch the mousedown, click, set value, and fire events

        await driver.executeScript(() => {

            const input = document.querySelector('input[name="phone"]');

            if (input) {

                input.scrollIntoView({ behavior: 'smooth', block: 'center' });



                const event = new MouseEvent('mousedown', { bubbles: true });

                input.dispatchEvent(event);



                input.click();

                input.focus();

                input.value = "5551234567";



                input.dispatchEvent(new Event('input', { bubbles: true }));

                input.dispatchEvent(new Event('change', { bubbles: true }));



                console.log("✅ Phone value set!");

            } else {

                console.log("❌ Phone input not found");

            }

        });



        async function getTimerValue() {

            return await driver.executeScript(() => {

                const timer = document.querySelector('#up > form > h4 > p'); // Replace this

                return timer ? timer.textContent.trim() : null;

            });

        }



        // Monitor the timer and wait for specific value

        let timerValue;

        do {

            timerValue = await getTimerValue();







            if (timerValue === '00:58:59') {



                let i = 0;

                const imax = 5;

                const B = By.css("body > div:nth-child(3) > div.container > div:nth-child(3) > div > div > div > div:nth-child(2) > div:nth-child(2) > div > button.btn.btn-primary");



                while (i < imax) {

                    try {

                        await driver.wait(until.elementLocated(B), 3000);

                        await driver.findElement(B).click();

                        console.log("✅ last button clicked");

                    } catch (e) {

                        console.log("❌ Button not found on attempt #", i + 1);

                        break;

                    }

                    console.log("Tried #", i + 1);

                    i++;

                }







            }

            await sleep(1000); // Wait 1 second before checking again

        } while (timerValue !== null);



        console.log('✅ Target time reached contuniar clicked');













        //robot



        // Take screenshot of CAPTCHA element



        try {

            let captcha2 = await driver.wait(until.elementLocated(By.css('#up > div:nth-child(1) > div > div > div > div > div > center > img')), 30000);

            // Get initial src

            let initialSrc = await captcha2.getAttribute('src');

            // Wait for the src attribute to change

            await driver.wait(async () => {

                let currentSrc = await captcha2.getAttribute('src');

                return currentSrc !== initialSrc;

            }, 3000);

        } catch (e) { };



        let captcha2 = await driver.wait(until.elementLocated(By.css('#up > div:nth-child(1) > div > div > div > div > div > center > img')), 30000);



        console.log('Image src updated!');

        await driver.sleep(300);

        let image2 = await captcha2.takeScreenshot(true);

        fs.writeFileSync('captcha.png', image2, 'base64');



















        await (async () => {





            const imageBase64 = fs.readFileSync('captcha.png', { encoding: 'base64' });



            const payload = {

                userid: username,

                apikey: apikey,

                data: imageBase64

            };



            const response = await axios.post('https://api.apitruecaptcha.org/one/gettext', payload, {

                headers: { 'Content-Type': 'application/json' }

            });



            if (response.data.result) {

                console.log('✅ Captcha Text:', response.data.result);

                const text = response.data.result;



                const cleanedText = text

                    .replace(/\s+/g, '')                     // remove all spaces

                    .split('')

                    .map(char => {

                        if (char === 'P') return 'P';        // keep P uppercase

                        if (char === 'o' || char === 'O') return '0'; // convert o/O to 0

                        return char.toLowerCase();           // everything else to lowercase

                    })

                    .join('');



                console.log('Clean text:', cleanedText);

                let captchaInput = await driver.findElement(By.name('name'));

                await captchaInput.sendKeys(cleanedText);

                await driver.sleep(1000);



            } else {

                console.error('❌ Failed:', response.data);

            }

        })()

            .catch(error => {

                console.error('❌ Error:', error.response?.status, error.response?.data || error.message);

            });









        const aceptarBtn1b1 = await driver.wait(until.elementLocated(By.xpath("//button[normalize-space()='Aceptar']")), 60000);

        await driver.wait(until.elementIsVisible(aceptarBtn1b1), 10000);

        console.log('acceptar fouded');

        await driver.sleep(500);

        await aceptarBtn1b1.click();

        console.log('Aceptar clicked!');





        console.log('CAPTCHA answer sent and form submitted!');



















        //look for error



        (async () => {

            let i = 0

            let imax = 10



            while (i < imax) {

                console.log('captcha ikorèk reyesè', i + 1);



                try {

                    const errLocator = By.css('div[role="alert"].el-notification.right');



                    // Wait until the error alert is present (max 3s)

                    await driver.wait(until.elementLocated(errLocator), 2500);



                    console.log('captcha inkorèk');



                    //robot

                    try {

                        let captcha2 = await driver.wait(until.elementLocated(By.css('#up > div:nth-child(1) > div > div > div > div > div > center > img')), 30000);

                        // Get initial src

                        let initialSrc = await captcha2.getAttribute('src');

                        // Wait for the src attribute to change

                        await driver.wait(async () => {

                            let currentSrc = await captcha2.getAttribute('src');

                            return currentSrc !== initialSrc;

                        }, 3000);

                    } catch (e) {

                        console.log('no update in the image');

                    }







                    let captcha2 = await driver.wait(until.elementLocated(By.css('#up > div:nth-child(1) > div > div > div > div > div > center > img')), 30000);

                    console.log('Image src updated!');

                    await driver.sleep(300);

                    let image2 = await captcha2.takeScreenshot(true);

                    fs.writeFileSync('captcha.png', image2, 'base64');











                    await (async () => {





                        const imageBase64 = fs.readFileSync('captcha.png', { encoding: 'base64' });



                        const payload = {

                            userid: username,

                            apikey: apikey,

                            data: imageBase64

                        };



                        const response = await axios.post('https://api.apitruecaptcha.org/one/gettext', payload, {

                            headers: { 'Content-Type': 'application/json' }

                        });



                        if (response.data.result) {

                            console.log('✅ Captcha Text:', response.data.result);

                            const text = response.data.result;



                            const cleanedText = text

                                .replace(/\s+/g, '')                     // remove all spaces

                                .split('')

                                .map(char => {

                                    if (char === 'P') return 'P';        // keep P uppercase

                                    if (char === 'o' || char === 'O') return '0'; // convert o/O to 0

                                    return char.toLowerCase();           // everything else to lowercase

                                })

                                .join('');



                            console.log('Clean text:', cleanedText);

                            let captchaInput = await driver.findElement(By.name('name'));

                            await captchaInput.sendKeys(cleanedText);



                        } else {

                            console.error('❌ Failed:', response.data);

                        }

                    })()

                        .catch(error => {

                            console.error('❌ Error:', error.response?.status, error.response?.data || error.message);

                        });









                    const aceptarBtn1b = await driver.wait(until.elementLocated(By.xpath("//button[normalize-space()='Aceptar']")), 60000);

                    await driver.wait(until.elementIsVisible(aceptarBtn1b), 10000);

                    console.log('acceptar fouded');

                    await driver.sleep(500);

                    await aceptarBtn1b.click();

                    console.log('Aceptar clicked!');







                    console.log('CAPTCHA answer sent and form submitted!');



























                } catch (e) {

                    console.log('✅ No error detected.');

                    break;

                }

                i++;

            }

        })();



















        //wait until the month  appear

        await driver.wait(until.elementLocated(By.css('#up > div > div.info_colors.el-row.is-justify-center.el-row--flex > div:nth-child(1) > span')), 150000);

        await sleep(1000);













        console.log('Available day clicked!');



        let attempts = 0;

        let maxAttempts = 5;

        let success = false;



        while (attempts < maxAttempts && !success) {

            try {

                const elements = await driver.findElements(By.css('.fc-day-grid-event.fc-h-event.fc-event.fc-start.fc-end.classPointer'));



                if (elements.length < 2) {

                    console.log('Element not present, skipping...');

                    break; // Exit loop gracefully

                }



                // Refetch this element just before interaction to reduce staleness chance

                const refetchedElements = await driver.findElements(By.css('.fc-day-grid-event.fc-h-event.fc-event.fc-start.fc-end.classPointer'));

                await refetchedElements[1].click();



                console.log('✅ Clicked the target element successfully');

                success = true;









                //robot









                // Take screenshot of CAPTCHA element

                await driver.wait(until.elementLocated(By.css('div.pace.pace-inactive')), 30000);

                let captcha2 = await driver.wait(until.elementLocated(By.css('#up > div:nth-child(1) > div > div > div > div > div > center > img')), 30000);

                await driver.sleep(300);

                let image2 = await captcha2.takeScreenshot(true);

                fs.writeFileSync('captcha.png', image2, 'base64');









                await (async () => {





                    const imageBase64 = fs.readFileSync('captcha.png', { encoding: 'base64' });



                    const payload = {

                        userid: username,

                        apikey: apikey,

                        data: imageBase64

                    };



                    const response = await axios.post('https://api.apitruecaptcha.org/one/gettext', payload, {

                        headers: { 'Content-Type': 'application/json' }

                    });



                    if (response.data.result) {

                        console.log('✅ Captcha Text:', response.data.result);

                        const text = response.data.result;



                        const cleanedText = text

                            .replace(/\s+/g, '')                     // remove all spaces

                            .split('')

                            .map(char => {

                                if (char === 'P') return 'P';        // keep P uppercase

                                if (char === 'o' || char === 'O') return '0'; // convert o/O to 0

                                return char.toLowerCase();           // everything else to lowercase

                            })

                            .join('');



                        console.log('Clean text:', cleanedText);

                        let captchaInput = await driver.findElement(By.name('name'));

                        await captchaInput.sendKeys(cleanedText);



                    } else {

                        console.error('❌ Failed:', response.data);

                    }

                })()

                    .catch(error => {

                        console.error('❌ Error:', error.response?.status, error.response?.data || error.message);

                    });











                console.log('CAPTCHA answer sent and form submitted!');







                const aceptarBtn1b = await driver.wait(until.elementLocated(By.xpath("//button[normalize-space()='Aceptar']")), 60000);

                await driver.wait(until.elementIsVisible(aceptarBtn1b), 10000);

                console.log('acceptar fouded');

                await driver.sleep(500);

                await aceptarBtn1b.click();

                console.log('Aceptar clicked!');



                console.log('CAPTCHA answer sent and form submitted!');







                //look for error







                (async () => {

                    let i = 0

                    let imax = 5



                    while (i < imax) {

                        console.log('captcha ikorèk reyesè', i + 1);



                        try {

                            const errLocator = By.css('div[role="alert"].el-notification.right');



                            // Wait until the error alert is present (max 3s)

                            await driver.wait(until.elementLocated(errLocator), 2500);



                            console.log('captcha inkorèk');







                            let captcha2 = await driver.wait(until.elementLocated(By.css('#up > div:nth-child(1) > div > div > div > div > div > center > img')), 30000);

                            await driver.sleep(1500);

                            console.log('Image src updated!');

                            await driver.sleep(300);

                            let image2 = await captcha2.takeScreenshot(true);

                            fs.writeFileSync('captcha.png', image2, 'base64');







                            await (async () => {





                                const imageBase64 = fs.readFileSync('captcha.png', { encoding: 'base64' });



                                const payload = {

                                    userid: username,

                                    apikey: apikey,

                                    data: imageBase64

                                };



                                const response = await axios.post('https://api.apitruecaptcha.org/one/gettext', payload, {

                                    headers: { 'Content-Type': 'application/json' }

                                });



                                if (response.data.result) {

                                    console.log('✅ Captcha Text:', response.data.result);

                                    const text = response.data.result;



                                    const cleanedText = text

                                        .replace(/\s+/g, '')                     // remove all spaces

                                        .split('')

                                        .map(char => {

                                            if (char === 'P') return 'P';        // keep P uppercase

                                            if (char === 'o' || char === 'O') return '0'; // convert o/O to 0

                                            return char.toLowerCase();           // everything else to lowercase

                                        })

                                        .join('');



                                    console.log('Clean text:', cleanedText);

                                    let captchaInput = await driver.findElement(By.name('name'));

                                    await captchaInput.sendKeys(cleanedText);



                                } else {

                                    console.error('❌ Failed:', response.data);

                                }

                            })()

                                .catch(error => {

                                    console.error('❌ Error:', error.response?.status, error.response?.data || error.message);

                                });









                            const aceptarBtn1b = await driver.wait(until.elementLocated(By.xpath("//button[normalize-space()='Aceptar']")), 60000);

                            await driver.wait(until.elementIsVisible(aceptarBtn1b), 10000);

                            console.log('acceptar fouded');

                            await driver.sleep(500);

                            await aceptarBtn1b.click();

                            console.log('Aceptar clicked!');



                            console.log('CAPTCHA answer sent and form submitted!');



                            console.log('CAPTCHA answer sent and form submitted!');



























                        } catch (e) {

                            console.log('✅ No error detected.');

                            break;

                        }

                        i++;

                    }

                })();















                let element11a = await driver.wait(until.elementLocated(By.css('.el-col.el-col-24 .el-button.schedule-date-cmp')), 60000);



                // Click the element

                await element11a.click();

                console.log('Element clicked!');





                let element12a = await driver.wait(until.elementLocated(By.css('.el-col.el-col-24 .el-button.schedule-date-cmp')), 60000);



                // Click the element

                await element12a.click();

                console.log('Element clicked!');



                // Wait until the button is present (optional)

                await driver.wait(until.elementLocated(By.css('.el-button.el-button--primary')), 10000);



                // Find the button using its class and click it

                const button2 = await driver.findElement(By.css('.el-button.el-button--primary'));

                await button2.click();

                console.log('last Button clicked!');





                await driver.wait(until.elementLocated(By.css('#up > div:nth-child(1) > div > div > div > div > div > div.container-fluid.h-100 > div > div > div > button')), 90000);

                console.log('radevou pran ak sikse');





                let image4 = await driver.takeScreenshot();

                require('fs').writeFileSync('screenshot2.png', image4, 'base64');

                console.log('📸 Screenshot saved!');





            } catch (err) {

                if (err.name === 'StaleElementReferenceError') {

                    console.log('⚠️ Stale element, retrying... attempt', attempts + 1);

                    attempts++;

                    await driver.sleep(500); // Wait a bit before retry

                } else {

                    console.error('❌ Unexpected error:', err);

                    break; // Stop if it's a different error

                }

            }

        }















        console.log('pa jwenn jou nan premye mwa nap ale sou mawa swivan');



















































































        console.log('pa jwenn jou nan premye mwa nap ale sou mawa swivan');

























        //acceptar

        const aceptarBtn = await driver.wait(until.elementLocated(By.xpath("//button[normalize-space()='Aceptar']")), 60000);

        await driver.wait(until.elementIsVisible(aceptarBtn), 10000);

        console.log('acceptar fouded');

        await aceptarBtn.click();

        console.log('Aceptar clicked!');









        try {

            await sleep(200);

            //change month

            let i = 0;

            let imax = 5;

            while (i < imax) {

                try {

                    const nextButton = await driver.wait(until.elementLocated(By.css('.fc-next-button')), 90000);

                    // Click the "Next" button

                    await nextButton.click();

                    console.log('Next button clicked!');

                } catch (e) {

                    if (e.name === 'StaleElementReferenceError')

                        i++;

                }

                console.log('no stale element error');

                break;



            }





            //robot





            // Take screenshot of CAPTCHA element

            await driver.wait(until.elementLocated(By.css('div.pace.pace-inactive')), 30000);

            let captcha2 = await driver.wait(until.elementLocated(By.css('#up > div:nth-child(1) > div > div > div > div > div > center > img')), 30000);

            await driver.sleep(300);

            let image2 = await captcha2.takeScreenshot(true);

            fs.writeFileSync('captcha.png', image2, 'base64');





            await (async () => {





                const imageBase64 = fs.readFileSync('captcha.png', { encoding: 'base64' });



                const payload = {

                    userid: username,

                    apikey: apikey,

                    data: imageBase64

                };



                const response = await axios.post('https://api.apitruecaptcha.org/one/gettext', payload, {

                    headers: { 'Content-Type': 'application/json' }

                });



                if (response.data.result) {

                    console.log('✅ Captcha Text:', response.data.result);

                    const text = response.data.result;



                    const cleanedText = text

                        .replace(/\s+/g, '')                     // remove all spaces

                        .split('')

                        .map(char => {

                            if (char === 'P') return 'P';        // keep P uppercase

                            if (char === 'o' || char === 'O') return '0'; // convert o/O to 0

                            return char.toLowerCase();           // everything else to lowercase

                        })

                        .join('');



                    console.log('Clean text:', cleanedText);

                    let captchaInput = await driver.findElement(By.name('name'));

                    await captchaInput.sendKeys(cleanedText);

                    await driver.sleep(1000);



                } else {

                    console.error('❌ Failed:', response.data);

                }

            })()

                .catch(error => {

                    console.error('❌ Error:', error.response?.status, error.response?.data || error.message);

                });









            console.log('CAPTCHA answer sent and form submitted!');





            const aceptarBtn1b = await driver.wait(until.elementLocated(By.xpath("//button[normalize-space()='Aceptar']")), 60000);

            await driver.wait(until.elementIsVisible(aceptarBtn1b), 10000);

            console.log('acceptar fouded');

            await driver.sleep(500);

            await aceptarBtn1b.click();

            console.log('Aceptar clicked!');



            console.log('CAPTCHA answer sent and form submitted!');







            //look for error







            (async () => {

                let i = 0

                let imax = 5



                while (i < imax) {

                    console.log('captcha ikorèk reyesè', i + 1);



                    try {

                        const errLocator = By.css('div[role="alert"].el-notification.right');



                        // Wait until the error alert is present (max 3s)

                        await driver.wait(until.elementLocated(errLocator), 2500);



                        console.log('captcha inkorèk');



                        //robot

                        //robot

                        try {

                            let captcha2 = await driver.wait(until.elementLocated(By.css('#up > div:nth-child(1) > div > div > div > div > div > center > img')), 30000);

                            // Get initial src

                            let initialSrc = await captcha2.getAttribute('src');

                            // Wait for the src attribute to change

                            await driver.wait(async () => {

                                let currentSrc = await captcha2.getAttribute('src');

                                return currentSrc !== initialSrc;

                            }, 2000);

                        } catch (e) {

                            console.log('no update in the image');

                        }



                        let captcha2 = await driver.wait(until.elementLocated(By.css('#up > div:nth-child(1) > div > div > div > div > div > center > img')), 30000);

                        console.log('Image src updated!');

                        await driver.sleep(300);

                        let image2 = await captcha2.takeScreenshot(true);

                        fs.writeFileSync('captcha.png', image2, 'base64');



                        await (async () => {





                            const imageBase64 = fs.readFileSync('captcha.png', { encoding: 'base64' });



                            const payload = {

                                userid: username,

                                apikey: apikey,

                                data: imageBase64

                            };



                            const response = await axios.post('https://api.apitruecaptcha.org/one/gettext', payload, {

                                headers: { 'Content-Type': 'application/json' }

                            });



                            if (response.data.result) {

                                console.log('✅ Captcha Text:', response.data.result);

                                const text = response.data.result;



                                const cleanedText = text

                                    .replace(/\s+/g, '')                     // remove all spaces

                                    .split('')

                                    .map(char => {

                                        if (char === 'P') return 'P';        // keep P uppercase

                                        if (char === 'o' || char === 'O') return '0'; // convert o/O to 0

                                        return char.toLowerCase();           // everything else to lowercase

                                    })

                                    .join('');



                                console.log('Clean text:', cleanedText);

                                let captchaInput = await driver.findElement(By.name('name'));

                                await captchaInput.sendKeys(cleanedText);



                            } else {

                                console.error('❌ Failed:', response.data);

                            }

                        })()

                            .catch(error => {

                                console.error('❌ Error:', error.response?.status, error.response?.data || error.message);

                            });











                        console.log('CAPTCHA answer sent and form submitted!');







                        const aceptarBtn1b = await driver.wait(until.elementLocated(By.xpath("//button[normalize-space()='Aceptar']")), 60000);

                        await driver.wait(until.elementIsVisible(aceptarBtn1b), 10000);

                        console.log('acceptar fouded');

                        await driver.sleep(500);

                        await aceptarBtn1b.click();

                        console.log('Aceptar clicked!');



                        console.log('CAPTCHA answer sent and form submitted!');



























                    } catch (e) {

                        console.log('✅ No error detected.');

                        break;

                    }

                    i++;

                }

            })();









        } catch (err) {

            console.log(err);

        }













        let attempts1 = 0;

        let maxAttempts1 = 5;

        let success1 = false;



        while (attempts1 < maxAttempts1 && !success1) {

            try {

                await driver.wait(until.elementsLocated(By.css('.fc-day-grid-event.fc-h-event.fc-event.fc-start.fc-end.classPointer')), 60000);

                const elements = await driver.findElements(By.css('.fc-day-grid-event.fc-h-event.fc-event.fc-start.fc-end.classPointer'));



                if (elements.length < 2) {

                    console.log('Element not present, skipping...');

                    break; // Exit loop gracefully

                }



                // Refetch this element just before interaction to reduce staleness chance

                const refetchedElements = await driver.findElements(By.css('.fc-day-grid-event.fc-h-event.fc-event.fc-start.fc-end.classPointer'));

                await refetchedElements[1].click();



                console.log('✅ Clicked the target element successfully');

                success1 = true;









                //robot





                // Take screenshot of CAPTCHA element

                await driver.wait(until.elementLocated(By.css('div.pace.pace-inactive')), 30000);

                let captcha2 = await driver.wait(until.elementLocated(By.css('#up > div:nth-child(1) > div > div > div > div > div > center > img')), 30000);

                let image2 = await captcha2.takeScreenshot(true);

                fs.writeFileSync('captcha.png', image2, 'base64');





                await (async () => {





                    const imageBase64 = fs.readFileSync('captcha.png', { encoding: 'base64' });



                    const payload = {

                        userid: username,

                        apikey: apikey,

                        data: imageBase64

                    };



                    const response = await axios.post('https://api.apitruecaptcha.org/one/gettext', payload, {

                        headers: { 'Content-Type': 'application/json' }

                    });



                    if (response.data.result) {

                        console.log('✅ Captcha Text:', response.data.result);

                        const text = response.data.result;



                        const cleanedText = text

                            .replace(/\s+/g, '')                     // remove all spaces

                            .split('')

                            .map(char => {

                                if (char === 'P') return 'P';        // keep P uppercase

                                if (char === 'o' || char === 'O') return '0'; // convert o/O to 0

                                return char.toLowerCase();           // everything else to lowercase

                            })

                            .join('');



                        console.log('Clean text:', cleanedText);

                        let captchaInput = await driver.findElement(By.name('name'));

                        await captchaInput.sendKeys(cleanedText);



                    } else {

                        console.error('❌ Failed:', response.data);

                    }

                })()

                    .catch(error => {

                        console.error('❌ Error:', error.response?.status, error.response?.data || error.message);

                    });











                console.log('CAPTCHA answer sent and form submitted!');





                const aceptarBtn1b = await driver.wait(until.elementLocated(By.xpath("//button[normalize-space()='Aceptar']")), 60000);

                await driver.wait(until.elementIsVisible(aceptarBtn1b), 10000);

                console.log('acceptar fouded');

                await driver.sleep(500);

                await aceptarBtn1b.click();

                console.log('Aceptar clicked!');

                console.log('CAPTCHA answer sent and form submitted!');



                console.log('CAPTCHA answer sent and form submitted!');







                //look for error







                (async () => {

                    let i = 0

                    let imax = 5



                    while (i < imax) {

                        console.log('captcha ikorèk reyesè', i + 1);



                        try {

                            const errLocator = By.css('div[role="alert"].el-notification.right');



                            // Wait until the error alert is present (max 3s)

                            await driver.wait(until.elementLocated(errLocator), 2500);



                            console.log('captcha inkorèk');



                            //robot

                            await driver.sleep(1500);







                            let captcha2 = await driver.wait(until.elementLocated(By.css('#up > div:nth-child(1) > div > div > div > div > div > center > img')), 30000);

                            console.log('Image src updated!');

                            await driver.sleep(300);

                            let image2 = await captcha2.takeScreenshot(true);

                            fs.writeFileSync('captcha.png', image2, 'base64');



                            await (async () => {





                                const imageBase64 = fs.readFileSync('captcha.png', { encoding: 'base64' });



                                const payload = {

                                    userid: username,

                                    apikey: apikey,

                                    data: imageBase64

                                };



                                const response = await axios.post('https://api.apitruecaptcha.org/one/gettext', payload, {

                                    headers: { 'Content-Type': 'application/json' }

                                });



                                if (response.data.result) {

                                    console.log('✅ Captcha Text:', response.data.result);

                                    const text = response.data.result;



                                    const cleanedText = text

                                        .replace(/\s+/g, '')                     // remove all spaces

                                        .split('')

                                        .map(char => {

                                            if (char === 'P') return 'P';        // keep P uppercase

                                            if (char === 'o' || char === 'O') return '0'; // convert o/O to 0

                                            return char.toLowerCase();           // everything else to lowercase

                                        })

                                        .join('');



                                    console.log('Clean text:', cleanedText);

                                    let captchaInput = await driver.findElement(By.name('name'));

                                    await captchaInput.sendKeys(cleanedText);



                                } else {

                                    console.error('❌ Failed:', response.data);

                                }

                            })()

                                .catch(error => {

                                    console.error('❌ Error:', error.response?.status, error.response?.data || error.message);

                                });









                            let submitButton = await driver.findElement(By.css('#up > div:nth-child(1) > div > div > div > div > div > center > div.container-fluid.h-100 > div > div > div > button'));

                            await submitButton.click();



                            console.log('CAPTCHA answer sent and form submitted!');





                            const aceptarBtn1b = await driver.wait(until.elementLocated(By.xpath("//button[normalize-space()='Aceptar']")), 60000);

                            await driver.wait(until.elementIsVisible(aceptarBtn1b), 10000);

                            console.log('acceptar fouded');

                            await driver.sleep(100);

                            await aceptarBtn1b.click();

                            console.log('Aceptar clicked!');

                            console.log('CAPTCHA answer sent and form submitted!');

























                        } catch (e) {

                            console.log('✅ No error detected.');

                            break;

                        }

                    }

                })();























                let element11a = await driver.wait(until.elementLocated(By.css('.el-col.el-col-24 .el-button.schedule-date-cmp')), 60000);



                // Click the element

                await element11a.click();

                console.log('Element clicked!');





                let element12a = await driver.wait(until.elementLocated(By.css('.el-col.el-col-24 .el-button.schedule-date-cmp')), 60000);



                // Click the element

                await element12a.click();

                console.log('Element clicked!');



                // Wait until the button is present (optional)

                await driver.wait(until.elementLocated(By.css('.el-button.el-button--primary')), 10000);



                // Find the button using its class and click it

                const button2 = await driver.findElement(By.css('.el-button.el-button--primary'));

                await button2.click();

                console.log('last Button clicked!');





                await driver.wait(until.elementLocated(By.css('#up > div:nth-child(1) > div > div > div > div > div > div.container-fluid.h-100 > div > div > div > button')), 90000);

                console.log('radevou pran ak sikse');





                let image4 = await driver.takeScreenshot();

                require('fs').writeFileSync('screenshot2.png', image4, 'base64');

                console.log('📸 Screenshot saved!');





            } catch (err) {

                if (err.name === 'StaleElementReferenceError') {

                    console.log('⚠️ Stale element, retrying... attempt', attempts1 + 1);

                    attempts1++;

                    await driver.sleep(500); // Wait a bit before retry

                } else {

                    console.error('❌ Unexpected error:', err);

                    break; // Stop if it's a different error

                }

            }

        }

        // ▶️ Continue script here

    });



    // HTTP trigger server

    const server = http.createServer((req, res) => {



        console.log('✅ Received /continue trigger from HTTP.');

        resumeAllTasks();

        res.end(`robot${NA} lanse!...`);



    });



    server.listen(3000, () => {

        console.log('🚀 HTTP trigger ready at http://localhost:3000/continue');

    });



})();
