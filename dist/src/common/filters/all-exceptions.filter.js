"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
let AllExceptionsFilter = class AllExceptionsFilter {
    httpAdapterHost;
    constructor(httpAdapterHost) {
        this.httpAdapterHost = httpAdapterHost;
    }
    catch(exception, host) {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        let httpStatus = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        if (exception instanceof common_1.HttpException) {
            httpStatus = exception.getStatus();
        }
        else if (exception && exception.code === 'P2002') {
            httpStatus = common_1.HttpStatus.CONFLICT;
        }
        else if (exception && exception.code === 'P2025') {
            httpStatus = common_1.HttpStatus.NOT_FOUND;
        }
        let errorResponse = 'Internal server error';
        if (exception instanceof common_1.HttpException) {
            errorResponse = exception.getResponse();
        }
        else if (exception && exception.code === 'P2002') {
            errorResponse = 'Unique constraint failed on the database';
        }
        else if (exception && exception.code === 'P2025') {
            errorResponse = 'Record not found in the database';
        }
        const message = typeof errorResponse === 'string'
            ? [errorResponse]
            : errorResponse.message || [errorResponse];
        let errorStr = 'Internal Server Error';
        if (exception instanceof common_1.HttpException) {
            errorStr = exception.name;
        }
        else if (exception && exception.code) {
            errorStr = 'Prisma Client Error';
        }
        const responseBody = {
            statusCode: httpStatus,
            error: errorStr.replace('Exception', ''),
            message: Array.isArray(message) ? message : [message],
            path: httpAdapter.getRequestUrl(ctx.getRequest()),
            timestamp: new Date().toISOString(),
        };
        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
};
exports.AllExceptionsFilter = AllExceptionsFilter;
exports.AllExceptionsFilter = AllExceptionsFilter = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [core_1.HttpAdapterHost])
], AllExceptionsFilter);
//# sourceMappingURL=all-exceptions.filter.js.map