import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Recording } from './recording.entity';
import { RECORDING_REPOSITORY } from '../../common/database/providers.constants';

@Injectable()
export class RecordingsRepository {
  constructor(
    @Inject(RECORDING_REPOSITORY)
    private readonly repository: Repository<Recording>,
  ) {}

  async findAll(): Promise<Recording[]> {
    return this.repository.find({
      relations: ['user', 'topic']
    });
  }

  async findById(id: number): Promise<Recording | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['user', 'topic']
    });
  }

  async findByUserId(user_id: number): Promise<Recording[]> {
    return this.repository.find({
      where: { user_id },
      relations: ['topic']
    });
  }

  async findByTopicId(topic_id: number): Promise<Recording[]> {
    return this.repository.find({
      where: { topic_id },
      relations: ['user']
    });
  }

  async create(recordingData: Partial<Recording>): Promise<Recording> {
    const recording = this.repository.create(recordingData);
    return this.repository.save(recording);
  }

  async update(id: number, recordingData: Partial<Recording>): Promise<Recording | null> {
    await this.repository.update(id, recordingData);
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected > 0;
  }

  async getUserTotalRecordingTime(user_id: number): Promise<number> {
    const result = await this.repository
      .createQueryBuilder('recording')
      .select('SUM(recording.duration_seconds)', 'totalDuration')
      .where('recording.user_id = :user_id', { user_id })
      .getRawOne();

    return result.totalDuration || 0;
  }
}
