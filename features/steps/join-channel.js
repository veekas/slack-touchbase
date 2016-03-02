'use strict';
var sinon = require('sinon');
var botLib = require('../../lib/bot');
var util = require('./common');

module.exports = function() {
  var _fakeController;
  var _createJoinFn = null;
  var _botReply = '';
  var _botName = '';

  this.Given(/^the bot is named "([^"]+)"$/, function(botName) {
    _botName = botName;
    botLib.joinChannel(util.botController, botName);
    _createJoinFn = util.getHandler(util.botController.on);
  });

  this.When('the bot joins a channel', function(done) {
    var bot = { };
    bot.reply = sinon.spy();

    _createJoinFn(bot, { });

    util.wait(function() { return bot.reply.called; }, function() {
      _botReply = bot.reply.args[0][1].text;
      done();
    });
  });

  this.Then(/^the bot says "(.+)"$/, function(message) {
    var expected = message.replace(/@<(bot-name)>/, '@' + _botName);

    if(expected === _botReply) {
      return true;
    } else {
      throw new Error('Bot introduction was not "' + expected + '"');
    }
  });
};
