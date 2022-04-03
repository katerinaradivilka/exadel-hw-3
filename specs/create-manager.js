describe('Create manager', function() {
    const email = 'walker@jw.com';
    const password = 'password';
    const url = 'https://viktor-silakov.github.io/course-sut';


    it('Created managers are saved in table', async function() {
        const CREATE_MANAGER_MENU_ITEM_SELECTOR = '//a[@href="./formManager.html"]';
        const manager1 = {
            email: "user1@gmail.com",
            password: "psw1",
            address1: "Ul Yakubova 10",
            address2: "Ul Yakubova 12",
            state: "United States",
            stateAbbreviated: "US",
            zip: "1234",
            description: "description 1",
            demo: false,
            supervisor: true,
            country: true,
            city: "city1"
        };
        const manager2 = {
            email: "user2@gmail.com",
            password: "psw2",
            address1: "Ul Yakubova 14",
            address2: "Ul Yakubova 16",
            state: "India",
            stateAbbreviated: "IN",
            zip: "4567",
            description: "description 2",
            demo: true,
            supervisor: false,
            region: true,
            city: "city2"
        };

        async function fillFormWithManagerData(manager) {
            await $('#email').setValue(manager.email);
            await $('#password').setValue(manager.password);
            await $('#address1').setValue(manager.address1);
            await $('#address2').setValue(manager.address2);
            await $('#state').selectByVisibleText(manager.state);
            await $('#zip').setValue(manager.zip);
            await $('#description').setValue(manager.description);
            if (manager.demo) {
                await $('#demo-balance').click();
            }
            if (manager.supervisor) {
                await $('#wait-supervisor').click();
            }

            if (manager.region) {
                await $('input[value="region"]').click();
            }
            if (manager.country) {
                await $('input[value="country"]').click();
            }
            await $('#city').setValue(manager.city);
            // click on the first result of dropdown
            await $('#autoComplete_result_0').click();
            await $('button[type="submit"]').click();

        }
        async function validateManagerDataInTable(manager) {
            const managerRowSelector = `//div[@tabulator-field="email"][text()="${manager.email}"]/..`;
            expect(await $(managerRowSelector).$('div[tabulator-field="role"]').getText()).toEqual("manager");
            expect(await $(managerRowSelector).$('div[tabulator-field="address1"]').getText()).toEqual(manager.address1);
            expect(await $(managerRowSelector).$('div[tabulator-field="address2"]').getText()).toEqual(manager.address2);
            expect(await $(managerRowSelector).$('div[tabulator-field="city"]').getText()).toEqual(manager.city);
            expect(await $(managerRowSelector).$('div[tabulator-field="state"]').getText()).toEqual(manager.stateAbbreviated);
            expect(await $(managerRowSelector).$('div[tabulator-field="zip"]').getText()).toEqual(manager.zip);
            expect(await $(managerRowSelector).$('div[tabulator-field="description"]').getText()).toEqual(manager.description);
            expect(await $(managerRowSelector).$('div[tabulator-field="demo-balance"]').getText()).toEqual(manager.demo ? "on" : " ");
            expect(await $(managerRowSelector).$('div[tabulator-field="wait-supervisor"]').getText()).toEqual(manager.supervisor ? "on" : " ");
            expect(await $(managerRowSelector).$('div[tabulator-field="manager-type"]').getText()).toEqual(manager.country ? "country" : "region");
        }
        await browser.url(url);
        await $('#login').setValue(email);
        await $('#password').setValue(password);
        await $('button').click();
        await $('#user-label').waitForDisplayed({ timeout: 15000 });
        // create managers
        await $(CREATE_MANAGER_MENU_ITEM_SELECTOR).click();
        await fillFormWithManagerData(manager1);
        await $(CREATE_MANAGER_MENU_ITEM_SELECTOR).click();
        await fillFormWithManagerData(manager2);
        // validate managers data in table
        await validateManagerDataInTable(manager1);
        await validateManagerDataInTable(manager2);
    });
});