// import { expect } from "chai";
import sinon from "sinon";
import { getAllUsers } from "../controllers/Users/UsersCont";
import Users from "../models/userModel";
// import { sendEmailToEmployer } from "../controllers/contactEmployer/contactEmployerCont";
import "mocha";

describe("sendEmailToEmployer", () => {
  describe("sendEmail", () => {
    it("Send Email to Employer", async () => {
      const fakeUserData: Array<{
        email: string;
        firstName: string;
        lastName: string;
        role: string;
        password: string;
      }> = [
        {
          email: "test@example.com",
          firstName: "John",
          lastName: "Doe",
          role: "user",
          password: "securePassword",
        },
        // Add more mock user data as needed...
      ];

      // Mock request object with specific properties
      const req: any = {
        params: {}, // Add params if needed
        body: {}, // Add body if needed
        // Add any other required properties...
      };

      const res: any = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      } as unknown as Response; // Mock response object

      const UsersStub = sinon.stub(Users, "find").resolves(fakeUserData);

      await getAllUsers(req, res);

      sinon.assert.calledOnce(UsersStub);
      sinon.assert.calledWith(res.status, 200); // Check if status is called with 200
      sinon.assert.calledWith(res.json, fakeUserData); // Check if json method is called with expected data

      UsersStub.restore();
    });

    it("should handle internal server error", async () => {
      const req: any = {} as Request; // Mock request object
      const res: any = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      } as unknown as Response; // Mock response object

      const UsersStub = sinon
        .stub(Users, "find")
        .rejects(new Error("Database error"));

      await getAllUsers(req, res);

      sinon.assert.calledOnce(UsersStub);
      sinon.assert.calledWith(res.status, 500); // Check if status is called with 500
      sinon.assert.calledWith(res.json, { error: "Internal server error" }); // Check if json method is called with expected error
      UsersStub.restore();
    });
  });
  // Rest of your test cases for other controller functions...
});
