import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("########################");
    console.log(body);
    console.log("########################");
    // Validar campos obrigatórios
    const requiredFields = ['name', 'email', 'password', 'phone', 'type'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { message: `Campo ${field} é obrigatório` },
          { status: 400 }
        );
      }
    }

    // Validar tipo de usuário
    const validTypes = ['CLIENT', 'PROVIDER', 'ADMIN'];
    if (!validTypes.includes(body.type)) {
      return NextResponse.json(
        { message: 'Tipo de usuário inválido' },
        { status: 400 }
      );
    }

    // Validar formato do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { message: 'Email inválido' },
        { status: 400 }
      );
    }

    // Validar formato do telefone
    const phoneRegex = /^\+244[0-9]{9}$/;
    if (!phoneRegex.test(body.phone)) {
      return NextResponse.json(
        { message: 'Formato de telefone inválido. Use o formato: +244XXXXXXXXX' },
        { status: 400 }
      );
    }

    // Validar senha
    if (body.password.length < 8) {
      return NextResponse.json(
        { message: 'A senha deve ter pelo menos 8 caracteres' },
        { status: 400 }
      );
    }

    // Fazer a requisição para o backend
    const response = await fetch(`${process.env.BACKEND_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || 'Erro ao registrar usuário' },
        { status: response.status }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Erro no registro:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 