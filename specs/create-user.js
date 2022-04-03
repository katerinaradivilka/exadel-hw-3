describe('Create user', function() {
    const email = 'walker@jw.com';
    const password = 'password';
    const url = 'https://viktor-silakov.github.io/course-sut';


    it('Created user - fill form', async function() {
        const CREATE_USER_MENU_ITEM_SELECTOR = '//a[@href="./formUser.html"]';

        const userJSON = `{
          "email": "user@gmail.com",
          "password": "psw1",
          "address1": "Ul Yakubova 10",
          "address2": "Ul Yakubova 12",
          "zip": "1234",
          "description": "description 1",
          "city": "city1",
          "anual": "100"
}`

        async function fillFormUsingJson(json) {
            const user = JSON.parse(json)
            for (const userField in user) {
                await $(`#${userField}`).setValue(user[userField]);
            }
            await $('button[type="submit"]').click();
        }

        await browser.url(url);
        await $('#login').setValue(email);
        await $('#password').setValue(password);
        await $('button').click();
        await $('#user-label').waitForDisplayed({ timeout: 15000 });
        // create user
        await $(CREATE_USER_MENU_ITEM_SELECTOR).click();
        await fillFormUsingJson(userJSON);
    });
});