import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JWTDataService {
  constructor(private jwtService: JwtService) {}

  // async generateToken(userId: number): Promise<string> {
  //   const aa = `-----BEGIN PRIVATE KEY-----
  //   ${process.env.PRIVATE_KEY}
  //   -----END PRIVATE KEY-----`;
  //   const jwtData = {
  //     iss: 'https://auth-ms.com',
  //     sub: `${userId}`,
  //     aud: 'https://auth-ms.com',
  //     exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour
  //     nbf: Math.floor(Date.now() / 1000),
  //     jti: 'fsg1R34',
  //   };

  //   const importedPrivateKey = await importPKCS8(aa, 'EdDSA');
  //   return await new SignJWT(jwtData)
  //     .setProtectedHeader({ alg: 'EdDSA' })
  //     .sign(importedPrivateKey);

  //   //     const payload = { username: user.username, sub: user.userLoginInfoId };
  //   //     const token = await this.jwtService.signAsync(payload);
  // }

  // async generateRefreshToken(userId: number): Promise<string> {
  //   const jwtData = {
  //     iss: 'https://auth-ms.com',
  //     sub: `${userId}`,
  //     aud: 'https://auth-ms.com',
  //     exp: Math.floor(Date.now() / 1000) + 60 * 60 * 168, // 1 hour
  //     nbf: Math.floor(Date.now() / 1000),
  //     jti: 'fsg1R34',
  //   };

  //   const importedPrivateKey = await importPKCS8(
  //     EdDSAKeys.getPrivateKey(),
  //     'EdDSA',
  //   );
  //   return await new SignJWT(jwtData)
  //     .setProtectedHeader({ alg: 'EdDSA' })
  //     .sign(importedPrivateKey);

  //   //     const payload = { username: user.username, sub: user.userLoginInfoId };
  //   //     const token = await this.jwtService.signAsync(payload);
  // }

  // async verifyToken(token: string) {
  //   const aa = `-----BEGIN PUBLIC KEY-----
  //   ${process.env.PUBLIC_KEY}
  //   -----END PUBLIC KEY-----`;

  //   const importedPublicKey = await importSPKI(aa, 'EdDSA');
  //   const {
  //     payload: { sub },
  //     protectedHeader,
  //   } = await jwtVerify(token, importedPublicKey, {
  //     issuer: 'https://auth-ms.com',
  //     audience: 'https://auth-ms.com',
  //   });

  //   return Number(sub);

  //   // const token = await this.jwtService.verifyAsync(payload);
  // }

  async generateToken(userId: number, role: string): Promise<string> {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        data: { role },
      },
      {
        secret: process.env.JWT_ACCESS_SECRET, //this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: '15m',
      },
    );
  }

  async generateRefreshToken(userId: number): Promise<string> {
    return await this.jwtService.signAsync(
      {
        sub: userId,
      },
      {
        secret: process.env.JWT_REFRESH_SECRET, //this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      },
    );
  }

  // async verifyToken(token: string) {}
}
