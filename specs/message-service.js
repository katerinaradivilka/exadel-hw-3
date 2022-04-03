const {
    startClientPC,
    startSatelite,
    stopClientPC,
    stopEarthServer,
    stopSatelite,
    stopMarsServer,
    startEarthServer,
    startMarsServer,
    sendMessage,
    assertResponse
} = require('./stubs/messageservice.stubs');

const INVALID_TOKEN = 'X0000';

function startAllNodes() {
    startClientPC();
    const earthToken = startEarthServer();
    const marsToken = startMarsServer();
    startSatelite();
    return {
        earth: earthToken,
        mars: marsToken,
    }
}

function stopAllNodes() {
    stopMarsServer();
    stopEarthServer();
    stopSatelite();
    stopClientPC();
}

describe('Message Sending', function() {

    context('Happy path to Mars and Earth', () => {

        let tokens = {};
        beforeEach(function() {
            tokens = startAllNodes();
        })

        it('should send message to Mars without error', function() {
            const response = sendMessage('Hello', 'Mars', tokens.mars);
            assertResponse(response, 'Success');
        });

        it('should send message to Earth without error', function() {
            const response = sendMessage('Hello', 'Earth', tokens.earth);
            assertResponse(response, 'Success');
        });
    });

    context('Invalid token for Mars and Earth', () => {
        beforeEach(function() {
            startAllNodes();
        })
        it('should send message to Earth with "Security Error" if token is invalid', function() {
            const response = sendMessage('Hello', 'Earth', INVALID_TOKEN);
            assertResponse(response, 'Security Error');
        });

        it('should send message to Mars with "Security Error" if token is invalid', function() {
            const response = sendMessage('Hello', 'Mars', INVALID_TOKEN);
            assertResponse(response, 'Security Error');
        });
    });

    context('When SateLite is turned OFF', () => {
        let token = "";
        beforeEach(function() {
            startClientPC();
            token = startMarsServer();
        })

        it('Mars: valid token and turned OFF SateLite ', function() {
            const response = sendMessage('Hello', 'Mars', token);
            assertResponse(response, 'Service is unavailable');

        });
        it('Mars: invalid token and turned OFF SateLite ', function() {
            const response = sendMessage('Hello', 'Mars', INVALID_TOKEN);
            assertResponse(response, 'Service is unavailable');

        });

    });

    afterEach(function() {
        stopAllNodes();
    })



})