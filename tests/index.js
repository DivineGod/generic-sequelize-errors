var test = require('tape');
var util = require('util');
var genericSequeliseError = require('../');
var errors = require('generic-errors');

var BaseError = function (message) {
    this.message = message;
};
var ValidationError = function (message) {
    this.message = message;
};
var DatabaseError = function (message) {
    this.message = message;
};
var TimeoutError = function (message) {
    this.message = message;
};
var UniqueConstraintError = function (message) {
    this.message = message;
};
var ForeignKeyConstraintError = function (message) {
    this.message = message;
};
var ExclusionConstraintError = function (message) {
    this.message = message;
};
var ConnectionError = function (message) {
    this.message = message;
};
var ConnectionRefusedError = function (message) {
    this.message = message;
};
var AccessDeniedError = function (message) {
    this.message = message;
};
var HostNotFoundError = function (message) {
    this.message = message;
};
var HostNotReachableError = function (message) {
    this.message = message;
};
var InvalidConnectionError = function (message) {
    this.message = message;
};
var ConnectionTimedOutError = function (message) {
    this.message = message;
};
var InstanceError = function (message) {
    this.message = message;
};
util.inherits(BaseError, Error);
util.inherits(ValidationError, BaseError);
util.inherits(DatabaseError, BaseError);
util.inherits(TimeoutError, BaseError);
util.inherits(UniqueConstraintError, ValidationError);
util.inherits(ForeignKeyConstraintError, DatabaseError);
util.inherits(ExclusionConstraintError, DatabaseError);
util.inherits(ConnectionError, BaseError);
util.inherits(ConnectionRefusedError, ConnectionError);
util.inherits(AccessDeniedError, ConnectionError);
util.inherits(HostNotFoundError, ConnectionError);
util.inherits(HostNotReachableError, ConnectionError);
util.inherits(InvalidConnectionError, ConnectionError);
util.inherits(ConnectionTimedOutError, ConnectionError);
util.inherits(InstanceError, BaseError);

var testSequelize = {
    BaseError,
    ValidationError,
    DatabaseError,
    TimeoutError,
    UniqueConstraintError,
    ForeignKeyConstraintError,
    ExclusionConstraintError,
    ConnectionError,
    ConnectionRefusedError,
    AccessDeniedError,
    HostNotFoundError,
    HostNotReachableError,
    InvalidConnectionError,
    ConnectionTimedOutError,
    InstanceError,
};

test('module loading', function (t) {
    t.plan(4);

    var boundGeneric = genericSequeliseError(testSequelize);

    t.equal(typeof genericSequeliseError, 'function', 'module is a function');
    t.equal(genericSequeliseError.length, 2, 'takes two arguments');
    t.equal(typeof boundGeneric, 'function', 'bound convertion function');
    t.equal(boundGeneric.length, 1, 'takes 1 argument');
});

test('converts sequelize error type to generic-error type', function (t) {
    t.plan(3);

    var testError = new testSequelize.BaseError('some message');
    var expectedError = new errors.BaseError({ message: 'some message' });
    var expectedType = errors.BaseError;

    var boundGeneric = genericSequeliseError(testSequelize);
    t.ok(boundGeneric(testError), 'ok result');
    t.ok(boundGeneric(testError) instanceof expectedType, 'ok prototype');
    t.deepEqual(boundGeneric(testError), expectedError, 'correct error');
});
