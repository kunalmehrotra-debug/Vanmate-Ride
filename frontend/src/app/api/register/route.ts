import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { userId: data.userId },
          { email: data.email },
          { phone: data.phone }
        ]
      }
    });

    if (existingUser) {
      if (existingUser.userId === data.userId) {
        return NextResponse.json({ error: "User ID already exists" }, { status: 400 });
      }
      if (existingUser.email === data.email) {
        return NextResponse.json({ error: "Email already registered" }, { status: 400 });
      }
      if (existingUser.phone === data.phone) {
        return NextResponse.json({ error: "Phone number already registered" }, { status: 400 });
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Common user data
    const userData = {
      role: data.role,
      userId: data.userId,
      password: hashedPassword,
      name: data.name,
      email: data.email,
      phone: data.phone,
      city: data.city,
      address: data.address,
    };

    // Create user and profile in a transaction
    const newUser = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: userData,
      });

      if (data.role === 'parent') {
        await tx.parentProfile.create({
          data: {
            userId: user.id,
            studentName: data.studentName,
            studentStandard: data.studentStandard,
            studentAge: parseInt(data.studentAge),
            schoolName: data.schoolName,
          }
        });
      } else if (data.role === 'owner') {
        await tx.ownerProfile.create({
          data: {
            userId: user.id,
            hasVehicle: data.hasVehicle === 'yes',
            vehicleNumber: data.hasVehicle === 'yes' ? data.vehicleNumber : null,
            vehicleType: data.hasVehicle === 'yes' ? data.vehicleType : null,
            licenseNumber: data.licenseNumber,
            licenseStartDate: new Date(data.licenseStartDate),
            licenseEndDate: new Date(data.licenseEndDate),
            yearsOfExperience: parseInt(data.yearsOfExperience),
          }
        });
      } else if (data.role === 'school') {
        await tx.schoolProfile.create({
          data: {
            userId: user.id,
            schoolOfficialName: data.schoolOfficialName,
            schoolBoard: data.schoolBoard,
            schoolTotalStudents: parseInt(data.schoolTotalStudents),
            principalName: data.principalName,
          }
        });
      }

      return user;
    });

    return NextResponse.json({ success: true, message: "Registration successful" }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Something went wrong during registration" }, { status: 500 });
  }
}
