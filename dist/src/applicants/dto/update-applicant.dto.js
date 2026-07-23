"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateApplicantDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_applicant_dto_1 = require("./create-applicant.dto");
class UpdateApplicantDto extends (0, swagger_1.PartialType)(create_applicant_dto_1.CreateApplicantDto) {
}
exports.UpdateApplicantDto = UpdateApplicantDto;
//# sourceMappingURL=update-applicant.dto.js.map