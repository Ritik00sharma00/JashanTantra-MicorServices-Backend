import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../entitites/user.entity';

@Injectable()
export class UserServiceService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async createuser(createUserDto: CreateUserDto){
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(
      createUserDto.password ?? '',
      10,
    );

    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return await this.userRepository.save(newUser);
  }

  async loginUser(
    email: string,
    password: string,
  ) {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const existingUser= await this.userRepository.findOne({
      where: { email },
    });

    if (!existingUser) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    const secret = process.env['JWT_SECRET'];
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in the environment');
    }

    const token = jwt.sign(
      {
        sub: existingUser.id,
        email: existingUser.email,
        role: existingUser.role,
      },
      secret,
      { expiresIn: '1h' },
    );

    return {
      message: 'Login Successful',
      token,
    };
  }

  async editProfile(userId: string, updates: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    const { email, password, ...allowedUpdates } = updates as any;
    if (password) {
      allowedUpdates.password = await bcrypt.hash(password, 10);
    }

    Object.assign(user, allowedUpdates);
    return await this.userRepository.save(user);
  }

  async sendEmailVerification(email: string): Promise<{ message: string; verificationLink: string }> {
    const brevoApiKey = process.env.BREVO_API_KEY;
    const appUrl = process.env.APP_URL;
    const secret = process.env['JWT_SECRET'];

    if (!secret) {
      throw new Error('JWT_SECRET is not defined in the environment');
    }

    if (!appUrl) {
      throw new Error('APP_URL is not defined in the environment');
    }

    if (!brevoApiKey) {
      throw new Error('Brevo API key is not configured');
    }

    const token = jwt.sign({ email }, secret, { expiresIn: '1h' });
    const verificationLink = `${appUrl}/verify-email?token=${token}`;

    // Example Brevo SMTP API integration.
    // Replace the `sender` and `to` values with your real email and templates after you add the API key.
    const fetchFn = (globalThis as any).fetch as any;
    if (!fetchFn) {
      throw new Error('Global fetch is not available in this runtime');
    }

    await fetchFn('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': brevoApiKey,
      },
      body: JSON.stringify({
        sender: { email: process.env.BREVO_SENDER_EMAIL as string },
        to: [{ email }],
        subject: 'Verify your email',
        htmlContent: `<p>Please verify your email by clicking <a href="${verificationLink}">here</a>.</p>`,
      }),
    });

    return {
      message: 'Verification email queued',
      verificationLink,
    };
  }

  async findOrganizers(filter: {
    state?: string;
    city?: string;
    category?: string;
    t?: string;
  }): Promise<User[]> {
    const query = this.userRepository.createQueryBuilder('user');
    query.where('user.role = :role', { role: 'organizer' });

    if (filter.state) {
      query.andWhere('user.state = :state', { state: filter.state });
    }
    if (filter.city) {
      query.andWhere('user.city = :city', { city: filter.city });
    }
    if (filter.category) {
      query.andWhere('user.category = :category', { category: filter.category });
    }
    if (filter.t) {
      query.andWhere(
        '(user.name ILIKE :t OR user.about ILIKE :t OR user.category ILIKE :t)',
        { t: `%${filter.t}%` },
      );
    }

    return await query.getMany();
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async getUserById(userId: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { id: userId },
    });
  }

  async getPublicUserProfile(userId: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    const { password, ...rest } = user as any;
    return {
      ...rest,
      phoneNumber: user.contactHidden ? null : user.phoneNumber ?? null,
    };
  }
}
