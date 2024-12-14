import { IsNumber, IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateRecordingDto {
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsNotEmpty()
  @IsNumber()
  topic_id: number;

  @IsNotEmpty()
  @IsString()
  audio_file_path: string;

  @IsOptional()
  @IsString()
  transcribed_text?: string;

  @IsOptional()
  @IsString()
  corrected_text?: string;

  @IsOptional()
  @IsString()
  ai_audio_file_path?: string;

  @IsNotEmpty()
  @IsNumber()
  duration_seconds: number;
}
