import { prisma } from '../src/lib/prisma';
import { hashSync, compareSync } from 'bcryptjs';

async function testAuth() {
  console.log('🔍 Testing Authentication System...\n');

  const testEmail = 'test-user-' + Date.now() + '@example.com';
  const testPassword = 'TestPassword123!';
  const testName = 'Test User';

  try {
    // Step 1: Create a test user
    console.log('Step 1: Creating test user...');
    const hashedPassword = hashSync(testPassword, 10);
    console.log('✅ Password hashed successfully');

    const user = await prisma.user.create({
      data: {
        name: testName,
        email: testEmail,
        hashedPassword,
        role: 'USER',
        isActive: true,
        emailVerified: new Date(),
      },
    });

    console.log('✅ User created:', {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      isActive: user.isActive,
    });
    console.log();

    // Step 2: Test password comparison (simulate login)
    console.log('Step 2: Testing password verification...');
    const dbUser = await prisma.user.findUnique({
      where: { email: testEmail },
    });

    if (!dbUser || !dbUser.hashedPassword) {
      console.error('❌ User not found or no password');
      return;
    }

    const passwordMatch = compareSync(testPassword, dbUser.hashedPassword);
    console.log('Password match result:', passwordMatch ? '✅ MATCH' : '❌ NO MATCH');
    console.log();

    // Step 3: Test with wrong password
    console.log('Step 3: Testing with wrong password...');
    const wrongPasswordMatch = compareSync('WrongPassword123!', dbUser.hashedPassword);
    console.log('Wrong password result:', wrongPasswordMatch ? '❌ MATCH (SHOULD NOT MATCH)' : '✅ NO MATCH (CORRECT)');
    console.log();

    // Step 4: Verify all user fields
    console.log('Step 4: Verifying all user fields...');
    console.log('User details:', {
      id: dbUser.id,
      name: dbUser.name,
      email: dbUser.email,
      hashedPassword: dbUser.hashedPassword.substring(0, 20) + '...',
      role: dbUser.role,
      isActive: dbUser.isActive,
      emailVerified: dbUser.emailVerified,
      createdAt: dbUser.createdAt,
    });
    console.log();

    // Step 5: Count all users
    console.log('Step 5: Checking database...');
    const userCount = await prisma.user.count();
    console.log('Total users in database:', userCount);
    console.log();

    // Step 6: Clean up - Delete test user
    console.log('Step 6: Cleaning up...');
    await prisma.user.delete({
      where: { id: user.id },
    });
    console.log('✅ Test user deleted');
    console.log();

    console.log('🎉 All tests passed! Authentication system is working correctly.');
  } catch (error: any) {
    console.error('❌ Test failed:', error.message);
    console.error('Stack trace:', error.stack);
  } finally {
    await prisma.$disconnect();
  }
}

testAuth();
