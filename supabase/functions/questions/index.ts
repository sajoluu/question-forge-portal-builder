import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface QuestionData {
  question_type: string;
  method: string;
  exam_name: string;
  class: string;
  group: string;
  subject: string;
  chapter: string;
  question_type_detail: string;
  total_questions: number;
  selected_questions: string[];
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // Get authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabaseClient.auth.getUser();

    if (authError || !user) {
      console.error('Authentication error:', authError);
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const url = new URL(req.url);
    const pathParts = url.pathname.split('/').filter(Boolean);
    const questionId = pathParts[pathParts.length - 1];

    console.log(`Request: ${req.method} ${url.pathname}`);

    // GET /questions - Get all questions for the user
    if (req.method === 'GET' && !questionId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
      const { data, error } = await supabaseClient
        .from('questions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching questions:', error);
        return new Response(
          JSON.stringify({ error: error.message }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      return new Response(
        JSON.stringify({ data }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // GET /questions/:id - Get a specific question
    if (req.method === 'GET' && questionId) {
      const { data, error } = await supabaseClient
        .from('questions')
        .select('*')
        .eq('id', questionId)
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error fetching question:', error);
        return new Response(
          JSON.stringify({ error: error.message }),
          {
            status: 404,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      return new Response(
        JSON.stringify({ data }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // POST /questions - Create a new question
    if (req.method === 'POST') {
      const body: QuestionData = await req.json();

      const { data, error } = await supabaseClient
        .from('questions')
        .insert({
          user_id: user.id,
          question_type: body.question_type,
          method: body.method,
          exam_name: body.exam_name,
          class: body.class,
          group: body.group,
          subject: body.subject,
          chapter: body.chapter,
          question_type_detail: body.question_type_detail,
          total_questions: body.total_questions,
          selected_questions: body.selected_questions,
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating question:', error);
        return new Response(
          JSON.stringify({ error: error.message }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      return new Response(
        JSON.stringify({ data }),
        {
          status: 201,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // PUT /questions/:id - Update a question
    if ((req.method === 'PUT' || req.method === 'PATCH') && questionId) {
      const body: Partial<QuestionData> = await req.json();

      const { data, error } = await supabaseClient
        .from('questions')
        .update(body)
        .eq('id', questionId)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating question:', error);
        return new Response(
          JSON.stringify({ error: error.message }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      return new Response(
        JSON.stringify({ data }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // DELETE /questions/:id - Delete a question
    if (req.method === 'DELETE' && questionId) {
      const { error } = await supabaseClient
        .from('questions')
        .delete()
        .eq('id', questionId)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error deleting question:', error);
        return new Response(
          JSON.stringify({ error: error.message }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      return new Response(
        JSON.stringify({ message: 'Question deleted successfully' }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Method not allowed
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
