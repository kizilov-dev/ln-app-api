import { Injectable, NotFoundException } from '@nestjs/common';
import { RecordingsRepository } from './recordings.repository';
import { Recording } from './recording.entity';
import { UserProgressRepository } from '../user-progress/user-progress.repository';
import { CreateRecordingDto } from './dto/create-recording.dto';

@Injectable()
export class RecordingsService {
  constructor(
    private readonly recordingsRepository: RecordingsRepository,
    private readonly userProgressRepository: UserProgressRepository,
  ) {}

  async getAllRecordings(): Promise<Recording[]> {
    return this.recordingsRepository.findAll();
  }

  async getRecordingById(id: number): Promise<Recording> {
    const recording = await this.recordingsRepository.findById(id);
    if (!recording) {
      throw new NotFoundException(`Recording with ID ${id} not found`);
    }
    return recording;
  }

  async getRecordingsByUserId(user_id: number): Promise<Recording[]> {
    return this.recordingsRepository.findByUserId(user_id);
  }

  async getRecordingsByTopicId(topic_id: number): Promise<Recording[]> {
    return this.recordingsRepository.findByTopicId(topic_id);
  }

  async createRecording(createRecordingDto: CreateRecordingDto): Promise<Recording> {
    const newRecording = await this.recordingsRepository.create(createRecordingDto);

    // Update user progress
    if (newRecording.user_id && newRecording.duration_seconds) {
      await this.userProgressRepository.incrementPracticeTime(
        newRecording.user_id, 
        newRecording.duration_seconds
      );
      await this.userProgressRepository.updateStreak(newRecording.user_id, true);
    }

    return newRecording;
  }

  async updateRecording(id: number, recordingData: Partial<Recording>): Promise<Recording> {
    const updatedRecording = await this.recordingsRepository.update(id, recordingData);
    if (!updatedRecording) {
      throw new NotFoundException(`Recording with ID ${id} not found`);
    }
    return updatedRecording;
  }

  async deleteRecording(id: number): Promise<void> {
    const deleted = await this.recordingsRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Recording with ID ${id} not found`);
    }
  }

  async getUserTotalRecordingTime(user_id: number): Promise<number> {
    return this.recordingsRepository.getUserTotalRecordingTime(user_id);
  }
}
