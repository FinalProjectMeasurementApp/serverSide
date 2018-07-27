const chai = require("chai");
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");
const { shape} = require("../models");
const User = require("../models/user.js")
const { areaCalculator } = require("../controllers/areaCalculator");
const { userCalculator } = require("../controllers/userController");
const should = chai.should();
const app = require("../app");

chai.use(chaiHttp);

describe("GET /shape", function() {
  it("should have status 200", function(done) {
    this.timeout(5000);
    chai
      .request(app)
      .get("/shape")
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.should.be.a("array");
        done();
      });
  });

  it("should have list of shapes", function(done) {
    chai
      .request(app)
      .get("/shape")
      .end(function(err, res) {
        res.body.should.be.a("array");
        res.body[0].name.should.be.a("string");
        res.body[0].perimeter.should.be.a("number");
        res.body[0].area.should.be.a("number");
        res.body[0].coordinates.should.be.a("array");
        done();
      });
  });
});

describe("POST /shape/add", function() {
  let mockPayload = { name: "test", perimeter: 100, area: 100 };
  let mockErrorPayload = { name: "test", perimeter: 100 };
  let shapeId;
  it("should not add new item", function(done) {
    chai
      .request(app)
      .post("/shape/add")
      .send(mockErrorPayload)
      .end(function(err, res) {
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.errors.should.be.a("object");
        done();
      });
  });

  it("should return new item", function(done) {
    chai
      .request(app)
      .post("/shape/add")
      .send(mockPayload)
      .end(function(err, res) {
        shapeId = res.body._id;
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.name.should.equal("test");
        res.body.perimeter.should.equal(100);
        res.body.area.should.equal(100);
        res.body.coordinates.should.be.a("array");
        done();
      });
  });

  describe("PUT /shape/update/:shapeId", function() {
    it("should not have return updated shape", function(done) {
      let mockErrorUpdatePayload = {
        name: "updated test",
        perimeter: "string",
        area: 200,
        coordinates: []
      };
      chai
        .request(app)
        .put(`/shape/update/${shapeId}`)
        .send(mockErrorUpdatePayload)
        .end(function(err, res) {
          if (err) {
            console.log(err);
            done();
          }
          res.should.have.status(400);
          res.body.should.be.a("object");
          done();
        });
    });

    it("should have return updated shape", function(done) {
      let mockUpdatePayload = {
        name: "updated test",
        perimeter: 200,
        area: 200
      };
      this.timeout(5000);
      chai
        .request(app)
        .put(`/shape/update/${shapeId}`)
        .send(mockUpdatePayload)
        .end(function(err, res) {
          if (err) {
            console.log(err);
            done();
          }
          res.should.have.status(200);

          res.body.name.should.equal("updated test");
          res.body.perimeter.should.equal(200);
          res.body.area.should.equal(200);
          res.body.coordinates.should.be.a("array");
          done();
        });
    });
  });

  describe("DELETE /shape/delete/:shapeId", function() {
    it("should not have return deleted shape", function(done) {
      chai
        .request(app)
        .delete(`/shape/delete/123`)
        .end(function(err, res) {
          if (err) {
            console.log(err);
            done();
          }
          res.should.have.status(400);
          res.body.should.be.a("object");

          done();
        });
    });

    it("should have return deleted shape", function(done) {
      this.timeout(5000);
      chai
        .request(app)
        .delete(`/shape/delete/${shapeId}`)
        .end(function(err, res) {
          if (err) {
            console.log(err);
            done();
          }
          res.should.have.status(200);

          res.body.name.should.equal("updated test");
          res.body.perimeter.should.equal(200);
          res.body.area.should.equal(200);
          res.body.coordinates.should.be.a("array");

          mongoose.connection.close(function() {
            console.log("Mongoose connection disconnected");
          });

          done();
        });
    });
  });
});

describe("area calculator", function() {
  it(`area of
   _____      _____
  |     |    |     |
  |     |____|     |
  |                |
  |________________|
  
  should be 20

  `, function(done) {
    let arrayOfCoordinates = [
      [1, 6],
      [3, 6],
      [3, 4],
      [5, 4],
      [5, 6],
      [7, 6],
      [7, 2],
      [1, 2]
    ];
    let area = areaCalculator(arrayOfCoordinates);
    area.should.be.a("number");
    area.should.be.equal(20);
    done();
  });
});

describe("GET /user", function() {
  it("should have status 200", function(done) {
    this.timeout(5000);
    chai
      .request(app)
      .get("/user")
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.should.be.a("array");
        done();
      });
  });

  it("should have list of user", function(done) {
    chai
      .request(app)
      .get("/user")
      .end(function(err, res) {
        res.body.should.be.a("array");
        res.body[0].username.should.be.a("string");
        done();
      });
  });
});

describe('POST/user/add', () => {
  it('it should POST new user', (done) => {
    let user = new User({
      username: "test",
    })
    chai.request(app)
      .post('/user')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.username.should.equal("test");
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('data');
        res.body.data.should.have.property('_id');
        res.body.data.should.have.property('username');
        res.body.data.should.have.property('createdAt');
        res.body.data.should.have.property('updatedAt');
        done();
      })
  })
});

describe("DELETE /user/delete/:userId", function() {
  it("should not have return deleted user", function(done) {
    chai
      .request(app)
      .delete(`/user/delete/123`)
      .end(function(err, res) {
        if (err) {
          console.log(err);
          done();
        }
        res.should.have.status(400);
        res.body.should.be.a("object");
        done();
      });
  });

  it("should have return deleted user", function(done) {
    this.timeout(5000);
    chai
      .request(app)
      .delete(`/user/delete/123`)
      .end(function(err, res) {
        if (err) {
          console.log(err);
          done();
        }
        res.should.have.status(200);
        res.body.username.should.equal("test");
        mongoose.connection.close(function() {
          console.log("Mongoose connection disconnected");
        });
        done();
      });
  });
});
