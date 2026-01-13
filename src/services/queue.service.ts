type JobHandler<T = any> = (data: T) => Promise<void>;

interface Job<T = any> {
  id: number;
  name: string;
  data: T;
}

class QueueService {
  private queues: Map<string, JobHandler[]> = new Map();
  private jobs: Job[] = [];
  private jobId = 1;
  private processing = false;

  register<T>(jobName: string, handler: JobHandler<T>): void {
    const handlers = this.queues.get(jobName) || [];
    handlers.push(handler as JobHandler);
    this.queues.set(jobName, handlers);
  }

  add<T>(jobName: string, data: T): void {
    this.jobs.push({
      id: this.jobId++,
      name: jobName,
      data,
    });

    this.process();
  }

  private async process() {
    if (this.processing) return;
    this.processing = true;

    while (this.jobs.length > 0) {
      const job = this.jobs.shift()!;
      const handlers = this.queues.get(job.name) || [];

      for (const handler of handlers) {
        try {
          await handler(job.data);
        } catch (err) {
          console.error("Job failed:", job.name, err);
        }
      }
    }

    this.processing = false;
  }
}

export const queueService = new QueueService();
