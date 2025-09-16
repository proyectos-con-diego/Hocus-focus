import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const allEnvVars = process.env;
    const relevantVars = {};
    
    // Buscar todas las variables que contengan NOTION, TALLY o GOOGLE
    Object.keys(allEnvVars).forEach(key => {
      if (key.includes('NOTION') || key.includes('TALLY') || key.includes('SANITY') || key.includes('GOOGLE')) {
        relevantVars[key] = {
          present: !!allEnvVars[key],
          value: allEnvVars[key] ? allEnvVars[key].substring(0, 10) + '...' : 'NOT_FOUND',
          length: allEnvVars[key] ? allEnvVars[key].length : 0
        };
      }
    });

    return NextResponse.json({
      success: true,
      nodeEnv: process.env.NODE_ENV,
      relevantVars: relevantVars,
      totalEnvVars: Object.keys(allEnvVars).length,
      allEnvKeys: Object.keys(allEnvVars).filter(key => 
        key.includes('NOTION') || key.includes('TALLY') || key.includes('SANITY') || key.includes('GOOGLE')
      )
    });
  } catch (error) {
    return NextResponse.json({
      error: 'Error getting env vars',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
