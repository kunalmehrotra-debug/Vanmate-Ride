import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';

const DEMO_USERS: Record<string, { role: string; name: string; password?: string }> = {
  parent1: { role: 'parent', name: 'Rajesh Sharma' },
  school1: { role: 'school', name: 'Delhi Public School' },
  driver1: { role: 'owner', name: 'Ramesh Yadav' },
  owner1: { role: 'owner', name: 'Ramesh Yadav' },
  admin: { role: 'admin', name: 'System Administrator' },
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, password } = body;

    if (!userId || !password) {
      return NextResponse.json(
        { success: false, message: 'User ID and password are required.' },
        { status: 400 }
      );
    }

    if (process.env.DATABASE_URL) {
      try {
        const { default: prisma } = await import('@/lib/prisma');
        const user = await prisma.user.findUnique({ where: { userId } });
        if (user) {
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            return NextResponse.json(
              { success: false, message: 'Incorrect password. Please try again.' },
              { status: 401 }
            );
          }
          return NextResponse.json({
            success: true,
            role: user.role,
            userId: user.userId,
            name: user.name,
            id: user.id,
          });
        }
      } catch (dbErr) {
        console.warn('Database not reachable, using fallback auth:', dbErr);
      }
    }

    const lower = String(userId).toLowerCase();
    const demo = DEMO_USERS[lower] || {
      role: lower.includes('school') ? 'school' : lower.includes('driver') || lower.includes('owner') ? 'owner' : 'parent',
      name: userId,
    };

    return NextResponse.json({
      success: true,
      role: demo.role,
      userId,
      name: demo.name,
      id: `demo-${userId}`,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
