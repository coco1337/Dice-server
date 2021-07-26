import {ApiModel, ApiModelProperty} from 'swagger-express-ts';

@ApiModel({
  description: 'Auth Model',
  name: 'Auth',
})
export class authModel {
  @ApiModelProperty({
    description: '아이디',
    required : true,
  })
  id?: string;

  @ApiModelProperty({
    description: '패스워드',
    required : true,
  })
  password?: string;
}