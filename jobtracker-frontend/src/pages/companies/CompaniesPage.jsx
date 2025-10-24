import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompanies } from '../../store/companiesSlice';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/common/Card';
import { Loading } from '../../components/common/Loading';

const CompaniesPage = () => {
  const dispatch = useDispatch();
  const { companies, isLoading } = useSelector((state) => state.companies);

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Companies</h1>
        <p className="text-gray-600">Manage companies you've applied to</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.length > 0 ? (
          companies.map((company) => (
            <Card key={company.id}>
              <CardHeader>
                <CardTitle>{company.name}</CardTitle>
                <CardDescription>{company.industry}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-2">{company.location}</p>
                <p className="text-sm text-gray-500">Size: {company.size}</p>
                {company.website && (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 text-sm"
                  >
                    Visit Website
                  </a>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="col-span-full">
            <CardContent className="p-12 text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No companies found</h3>
              <p className="text-gray-600">Companies will appear here when you add job applications</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CompaniesPage;
