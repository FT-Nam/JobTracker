import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInterviews } from '../../store/interviewsSlice';
import { Card, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Loading } from '../../components/common/Loading';

const InterviewsPage = () => {
  const dispatch = useDispatch();
  const { interviews, isLoading } = useSelector((state) => state.interviews);

  useEffect(() => {
    dispatch(fetchInterviews());
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Interviews</h1>
        <p className="text-gray-600">Track your interview schedule and results</p>
      </div>

      <div className="space-y-4">
        {interviews.length > 0 ? (
          interviews.map((interview) => (
            <Card key={interview.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{interview.job?.title}</h3>
                    <p className="text-gray-600">{interview.job?.company?.name}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Round {interview.roundNumber} - {interview.interviewType?.displayName}
                    </p>
                    <p className="text-sm text-gray-500">
                      Scheduled: {new Date(interview.scheduledDate).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      interview.status?.name === 'SCHEDULED' ? 'bg-blue-100 text-blue-800' :
                      interview.status?.name === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                      interview.status?.name === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {interview.status?.displayName || interview.status?.name}
                    </span>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No interviews scheduled</h3>
              <p className="text-gray-600">Interviews will appear here when they are scheduled</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default InterviewsPage;
