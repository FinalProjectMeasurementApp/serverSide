const chai                             = require("chai");
const chaiHttp                         = require("chai-http");
const mongoose                         = require("mongoose");
const { areaCalculator }               = require("../controllers/areaCalculator");
const should                           = chai.should();
const expect                           = chai.expect();
const app                              = require("../app");

chai.use(chaiHttp);

describe("GET /", function () {
  it("should succes connect database", function (done) {
    this.timeout(5000);
    chai
      .request(app)
      .get("/")
      .end(function (err, res) {
        if (err) {
          console.log(err);
          done();
        }
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.text.should.equal("Measurement App Server");
        done();
      });
  });
});

describe("GET /shape", function () {
  it("should have status 200", function (done) {
    this.timeout(5000);
    chai
      .request(app)
      .get("/shape")
      .end(function (err, res) {
        if (err) {
          console.log(err);
          done();
        }
        res.should.have.status(200);
        res.body.should.be.a("array");
        done();
      });
  });

  it("should have list of shapes", function (done) {
    chai
      .request(app)
      .get("/shape")
      .end(function (err, res) {
        if (err) {
          console.log(err);
          done();
        }
        res.body.should.be.a("array");
        res.body[0].name.should.be.a("string");
        res.body[0].perimeter.should.be.a("number");
        res.body[0].area.should.be.a("number");
        res.body[0].coordinates.should.be.a("array");
        res.body[0].lengths.should.be.a("array");
        res.body[0].type.should.be.a("string");
        done();
      });
  });
});

describe("POST /shape/add", function () {
  const mockCoordinates = [
    [
      -0.06566426157951355,
      -0.6982777118682861,
      -0.2882850766181946
    ],
    [
      -0.13190507888793945,
      -0.7064650654792786,
      -0.23228560388088226
    ],
    [
      0.008311450481414795,
      -0.7085081338882446,
      -0.26130345463752747
    ]
  ]
  
  const mockLengths = [
    0.08673976361751556,
    0.14318767189979553,
    0.07874270528554916
  ]

  let shapeId;
  it("should not add new item", function (done) {
    this.timeout(5000)
    chai
      .request(app)
      .post("/shape/add")
      .attach("image", "./test/e270d2a95fa5e031cef0bae8a2adc034.jpg")
      .end(function (err, res) {
        if (err) {
          console.log(err);
          done();
        }
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.errors.should.be.a("object");
        done();
      });
  });

  it("should return new item", function (done) {
    this.timeout(10000)
    chai
      .request(app)
      .post("/shape/add")
      .attach("image", "./test/e270d2a95fa5e031cef0bae8a2adc034.jpg")
      .field("name", "test")
      .field("username", "5b5e92473d3d555ef0a4a320")
      .field("area", 100)
      .field("perimeter", 100)
      .field("coordinates", mockCoordinates)
      .field("lengths", mockLengths)
      .field("type", "floor")
      .end(function (err, res) {
        if (err) {
          console.log(err);
          done();
        }
        shapeId = res.body._id;
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.name.should.equal("test");
        res.body.perimeter.should.equal(100);
        res.body.area.should.equal(100);
        res.body.coordinates.should.be.a("array");
        res.body.lengths.should.be.a("array");
        res.body.type.should.equal("floor");
        done();
      });
  });

  describe("PUT /shape/update/:shapeId", function () {
    it("should not have return updated shape", function (done) {
      let mockErrorUpdatePayload = {
        name: "updated test",
        perimeter: "string",
        area: 200,
        coordinates: [
          []
        ],
        lengths: []
      };
      chai
        .request(app)
        .put(`/shape/update/${shapeId}`)
        .send(mockErrorUpdatePayload)
        .end(function (err, res) {
          if (err) {
            console.log(err);
            done();
          }
          res.should.have.status(400);
          res.body.should.be.a("object");
          done();
        });
    });

    it("should have return updated shape", function (done) {
      let mockUpdatePayload = {
        name: "updated test",
        perimeter: 200,
        area: 200,
        perimeter: 200,
        coordinates: [
          [
            200
          ]
        ],
        lengths: [
          200
        ],
        type: "wall"
      };
      this.timeout(5000);
      chai
        .request(app)
        .put(`/shape/update/${shapeId}`)
        .send(mockUpdatePayload)
        .end(function (err, res) {
          if (err) {
            console.log(err);
            done();
          }
          res.should.have.status(200);
          res.body.name.should.equal("updated test");
          res.body.perimeter.should.equal(200);
          res.body.area.should.equal(200);
          res.body.coordinates.should.be.a("array");
          res.body.lengths.should.be.a("array");
          res.body.type.should.equal("wall");
          done();
        });
    });
  });

  describe("DELETE /shape/delete/:shapeId", function () {
    it("should not have return deleted shape", function (done) {
      chai
        .request(app)
        .delete(`/shape/delete/123`)
        .end(function (err, res) {
          if (err) {
            console.log(err);
            done();
          }
          res.should.have.status(400);
          res.body.should.be.a("object");
          done();
        });
    });

    it("should have return deleted shape", function (done) {
      this.timeout(5000);
      chai
        .request(app)
        .delete(`/shape/delete/${shapeId}`)
        .end(function (err, res) {
          if (err) {
            console.log(err);
            done();
          }
          res.should.have.status(200);
          res.body.name.should.equal("updated test");
          res.body.perimeter.should.equal(200);
          res.body.area.should.equal(200);
          res.body.coordinates.should.be.a("array");
          res.body.lengths.should.be.a("array");
          res.body.type.should.equal("wall");
          done();
        });
    });
  });
});

describe("area calculator", function () {
  it(`area of
   _____      _____
  |     |    |     |
  |     |____|     |
  |                |
  |________________|
  
  should be 20

  `, function (done) {
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

describe("GET /user", function () {
  it("should have status 200", function (done) {
    this.timeout(5000);
    chai
      .request(app)
      .get("/user")
      .end(function (err, res) {
        if (err) {
          console.log(err);
          done();
        }
        res.should.have.status(200);
        res.body.should.be.a("array");
        done();
      });
  });

  it("should have list of user", function (done) {
    chai
      .request(app)
      .get("/user")
      .end(function (err, res) {
        if (err) {
          console.log(err);
          done();
        }
        res.body.should.be.a("array");
        res.body[0].username.should.be.a("string");
        done();
      });
  });
});

let userId;
describe("POST /user/add", function () {
  let userPayload = {
    username: "test"
  };
  let userErrorPayload = {
    name: "test"
  };

  it("should not add new user", function (done) {
    chai
      .request(app)
      .post("/user/add")
      .send(userErrorPayload)
      .end(function (err, res) {
        if (err) {
          console.log(err);
          done();
        }
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.errors.should.be.a("object");
        done();
      });
  });
  it("should return new user", function (done) {
    chai
      .request(app)
      .post("/user/add")
      .send(userPayload)
      .end(function (err, res) {
        if (err) {
          console.log(err);
          done();
        }
        userId = res.body._id;
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.username.should.equal("test");
        done();
      });
  });
});

describe("DELETE /user/delete/:userId", function () {
  it("should not have return deleted user", function (done) {
    chai
      .request(app)
      .delete(`/user/delete/123`)
      .end(function (err, res) {
        if (err) {
          console.log(err);
          done();
        }
        res.should.have.status(400);
        res.body.should.be.a("object");
        done();
      });
  });

  it("should have return deleted user", function (done) {
    this.timeout(5000);
    chai
      .request(app)
      .delete(`/user/delete/${userId}`)
      .end(function (err, res) {
        if (err) {
          console.log(err);
          done();
        }
        res.should.have.status(200);
        res.body.username.should.equal("test");
        done();
      });
  });
});

describe("GET /floor", function () {
  it("should have status 200", function (done) {
    this.timeout(5000);
    chai
      .request(app)
      .get("/floor")
      .end(function (err, res) {
        if (err) {
          console.log(err);
          done();
        }
        res.should.have.status(200);
        res.body.should.be.a("array");
        done();
      });
  });

  it("should have list of floor", function (done) {
    chai
      .request(app)
      .get("/floor")
      .end(function (err, res) {
        if (err) {
          console.log(err);
          done();
        }
        res.body.should.be.a("array");
        res.body[0].type.should.be.a("string");
        res.body[0].area.should.be.a("number");
        res.body[0].price.should.be.a("number");
        done();
      });
  });
});

let floorId;
describe("POST /floor/add", function () {
  let floorPayload ={
    type: "anatolia",
    price: 100, 
    area: 100
  };
  let floorErrorPayload = {
    type: "anatolia",
    price: 100
  };

  it("should not add new floor", function (done) {
    chai
      .request(app)
      .post("/floor/add")
      .send(floorErrorPayload)
      .end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.errors.should.be.a("object");
        done();
      });
  });

  it("should return new floor", function (done) {
    chai
      .request(app)
      .post("/floor/add")
      .send(floorPayload)
      .end(function (err, res) {
        floorId = res.body._id;
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.type.should.equal("anatolia");
        res.body.price.should.equal(100);
        res.body.area.should.equal(100);
        done();
      });
  });
});

describe("DELETE /floor/delete/:floorId", function () {
  it("should not have return deleted floor", function (done) {
    chai
      .request(app)
      .delete(`/floor/delete/123`)
      .end(function (err, res) {
        if (err) {
          console.log(err);
          done();
        }
        res.should.have.status(400);
        res.body.should.be.a("object");
        done();
      });
  });

  it("should have return deleted floor", function (done) {
    this.timeout(5000);
    chai
      .request(app)
      .delete(`/floor/delete/${floorId}`)
      .end(function (err, res) {
        if (err) {
          console.log(err);
          done();
        }
        res.should.have.status(200);
        res.body.type.should.equal("anatolia");
        res.body.price.should.equal(100);
        res.body.area.should.equal(100);
        done();
      });
  });
});

describe("GET /wall", function () {
  it("should have status 200", function (done) {
    this.timeout(5000);
    chai
      .request(app)
      .get("/wall")
      .end(function (err, res) {
        if (err) {
          console.log(err);
          done();
        }
        res.should.have.status(200);
        res.body.should.be.a("array");
        done();
      });
  });

  it("should have list of wall", function (done) {
    chai
      .request(app)
      .get("/wall")
      .end(function (err, res) {
        if (err) {
          console.log(err);
          done();
        }
        res.body.should.be.a("array");
        res.body[0].type.should.be.a("string");
        res.body[0].area.should.be.a("number");
        res.body[0].price.should.be.a("number");
        done();
      });
  });
});

let wallId;
describe("POST /wall/add", function () {
  let wallPayload ={
    type: "paint",
    price: 100, 
    area: 100
  };
  let wallErrorPayload = {
    type: "paint",
    price: 100
  };

  it("should not add new wall", function (done) {
    chai
      .request(app)
      .post("/wall/add")
      .send(wallErrorPayload)
      .end(function (err, res) {
        if (err) {
          console.log(err);
          done();
        }
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.errors.should.be.a("object");
        done();
      });
  });

  it("should return new wall", function (done) {
    chai
      .request(app)
      .post("/wall/add")
      .send(wallPayload)
      .end(function (err, res) {
        if (err) {
          console.log(err);
          done();
        }
        wallId = res.body._id;
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.type.should.equal("paint");
        res.body.price.should.equal(100);
        res.body.area.should.equal(100);
        done();
      });
  });
});

describe("DELETE /wall/delete/:wallId", function () {
  it("should not have return deleted wall", function (done) {
    chai
      .request(app)
      .delete(`/wall/delete/123`)
      .end(function (err, res) {
        if (err) {
          console.log(err);
          done();
        }
        res.should.have.status(400);
        res.body.should.be.a("object");
        done();
      });
  });

  it("should have return deleted wall", function (done) {
    this.timeout(5000);
    chai
      .request(app)
      .delete(`/wall/delete/${wallId}`)
      .end(function (err, res) {
        if (err) {
          console.log(err);
          done();
        }
        res.should.have.status(200);
        res.body.type.should.equal("paint");
        res.body.price.should.equal(100);
        res.body.area.should.equal(100);
        mongoose.connection.close(function () {
          console.log("Mongoose connection disconnected");
        });
        done();
      });
  });
});