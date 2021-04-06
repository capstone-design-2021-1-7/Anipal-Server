import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenDto {
  @ApiProperty({
    type: String,
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRtZGtkbWRrZGtka0BnbWFpbC5jb20iLCJpYXQiOjE2MTc2NDI0NTIsImV4cCI6MTYxNzcyODg1Mn0.Kf3Cm7Gw3FoIlo2qZT74wCT6HJ3aMWMjVEFwK3jk1Hk',
  })
  accessToken: string;
  @ApiProperty({ type: String, example: 'anipal.tk' })
  domain: string;
  @ApiProperty({ type: String, example: '/' })
  path: string;
  @ApiProperty({ type: Boolean, example: true })
  httpOnly: boolean;
  @ApiProperty({ type: Number, example: 86400000 })
  maxAge: number;
}
