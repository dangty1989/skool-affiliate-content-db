const { createJob } = require('../tools/create-job');
const { getJobStatus } = require('../tools/github');

const toolDefinitions = [
  {
    name: 'create_job',
    description:
      'Create an autonomous job for thepopebot to execute. Use this tool liberally - if the user asks for ANY task to be done, create a job. Jobs can handle code changes, file updates, research tasks, web scraping, data analysis, or anything requiring autonomous work. When the user explicitly asks for a job, ALWAYS use this tool. Returns the job ID and branch name.',
    input_schema: {
      type: 'object',
      properties: {
        job_description: {
          type: 'string',
          description:
            'Detailed job description including context and requirements. Be specific about what needs to be done.',
        },
      },
      required: ['job_description'],
    },
  },
  {
    name: 'get_job_status',
    description:
      'Check status of running jobs. Returns list of active workflow runs with timing and current step. Use when user asks about job progress, running jobs, or job status.',
    input_schema: {
      type: 'object',
      properties: {
        job_id: {
          type: 'string',
          description:
            'Optional: specific job ID to check. If omitted, returns all running jobs.',
        },
      },
      required: [],
    },
  },
];

const toolExecutors = {
  create_job: async (input) => {
    const result = await createJob(input.job_description);
    return {
      success: true,
      job_id: result.job_id,
      branch: result.branch,
    };
  },
  get_job_status: async (input) => {
    const result = await getJobStatus(input.job_id);
    return result;
  },
};

module.exports = { toolDefinitions, toolExecutors };
