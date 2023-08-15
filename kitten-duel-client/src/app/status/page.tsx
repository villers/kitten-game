'use client';
import { useEffect, useState } from 'react';

import { get } from '../service/StatusService';
import { responseType } from '@/app/type/StatusType';
import './page.scss';

const Page = () => {
  const [status, setStatus] = useState<responseType>({
    code: -1,
    label: 'Pas de label',
  });

  useEffect(() => {
    const fetchStatus = async () => {
      const response = await get();
      setStatus(response);
    };

    fetchStatus().catch(console.error);
  }, []);

  return (
    <div className="statusComponent">
      {status && (
        <section>
          <ul>
            <li>
              <span>Server status code</span> : {status.code}
            </li>
            <li>
              <span>Server status label</span> : {status.label}
            </li>
          </ul>
        </section>
      )}
    </div>
  );
};

export default Page;
