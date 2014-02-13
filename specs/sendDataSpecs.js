describe('Bugsense::Send Data', function () {
  beforeEach(function(){
    server = sinon.fakeServer.create();
  });
  afterEach(function(){
    server.restore();
  });
  it("should successfully to a request", function(){
    Bugsense.Network.send({name: 'Test Name', apiKey: Bugsense.config.apiKey}, 'POST');
    expect(server.requests[0].requestHeaders['Content-Type']).toBe('application/x-www-form-urlencoded;charset=utf-8');
    expect(server.requests[0].method).toBe('POST');
    server.requests[0].respond(
        200,
        { "Content-Type": "application/json" },
        'OK');
    Bugsense.Network.send({name: 'Test Name', apiKey: Bugsense.config.apiKey}, 'DELETE');
    expect(server.requests[1].method).toBe('DELETE');
    server.requests[1].respond(
        200,
        { "Content-Type": "application/json" },
        'OK');
  });
});
