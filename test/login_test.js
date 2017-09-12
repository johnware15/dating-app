process.env.NODE_ENV = 'test';
const client = require('../pg.js');

const {
  insertDater,
  insertDaterText
} = require('../queries/signup.js');

const {
  selectDater,
  selectDaterEmail,
  selectDaterEmailText,
  selectDaterText
} = require('../queries/login.js');

const expect = require('chai').expect;

describe('selectDater', function() {
  let dater = [
    'alicia@vikander.com',
    'avaexmachina',
    'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwjf1f2VwZHWAhUCqFQKHdFtDQ4QjRwIBw&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F484981453601992887%2F&psig=AFQjCNF4kDdn52LdCIQOFcNPjFJZ2saw1w&ust=1504819892258396',
    'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwjd3_K9wZHWAhXLgFQKHRnECAQQjRwIBw&url=http%3A%2F%2Fnerdist.com%2Fgo-behind-the-scenes-of-ex-machina-in-this-new-making-of-video%2F&psig=AFQjCNF4kDdn52LdCIQOFcNPjFJZ2saw1w&ust=1504819892258396',
    'Unwed actress getting ready to marry Magneto'
  ]

  before(function() {
    return insertDater(insertDaterText, dater).then((result) => {
    })
  })
  it('should return true if passwords matches', function() {
    return selectDater(selectDaterText, ['alicia@vikander.com'], 'avaexmachina').then((result) => {
      expect(result).to.equal(true)
    })
  })
  after(function() {
    client.query('TRUNCATE TABLE daters')
    .then(result => console.log('Truncate Table'))
    .catch(error => console.log(error))
  })
})
