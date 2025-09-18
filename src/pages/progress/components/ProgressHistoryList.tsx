
import React from 'react';
import { LessonHistory, LessonResult } from '../../../types';
import { timeFormat } from 'd3-time-format';

interface ProgressHistoryListProps {
  lessonHistory: LessonHistory;
}

const formatDate = timeFormat('%d %b %Y, %H:%M');

const ProgressHistoryList: React.FC<ProgressHistoryListProps> = ({ lessonHistory }) => {
  if (!lessonHistory || lessonHistory.length === 0) {
    return <p>No lesson history found.</p>;
  }

  // sort by most recent first
  const sortedHistory = [...lessonHistory].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <div className="w-100 overflow-x-auto">
      <table className="w-100" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr className="b--black-20 bb">
            <th className="pa2 tl">Date</th>
            <th className="pa2 tl">Lesson</th>
            <th className="pa2 tr">WPM</th>
            <th className="pa2 tl">Accuracy</th>
            <th className="pa2 tr">Words</th>
          </tr>
        </thead>
        <tbody>
          {sortedHistory.map((result: LessonResult, index: number) => (
            <tr key={index} className="b--black-20 bb">
              <td className="pa2">{formatDate(new Date(result.timestamp))}</td>
              <td className="pa2">{result.lessonTitle}</td>
              <td className="pa2 tr">{result.wpm.toFixed(0)}</td>
              <td className="pa2 tr">{result.accuracy.toFixed(0)}%</td>
              <td className="pa2 tr">{result.words.toFixed(0)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProgressHistoryList;
