describe('Wait for text method', function() {
    const email = 'walker@jw.com';
    const password = 'password';
    const url = 'https://viktor-silakov.github.io/course-sut';


    it('Check status is active', async function() {

        async function waitForText(selector, text, timeout) {
            await browser.waitUntil(async() => (await $(selector).getText()) === text, { timeout: timeout })
        }
        const selector = '#status';
        await browser.url(url);
        await $('#login').setValue(email);
        await $('#password').setValue(password);
        await $('button').click();
        await $('#user-label').waitForDisplayed({ timeout: 15000 });
        await $(selector).click();
        await waitForText(selector, "jj", 15000)
    });
});