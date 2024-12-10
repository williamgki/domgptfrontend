export const RateLimitInfo = ({ rateLimitInfo }) => {
    if (!rateLimitInfo) return null;
  
    const { requests_remaining, seconds_until_reset } = rateLimitInfo;
    const minutes = Math.floor(seconds_until_reset / 60);
    const seconds = seconds_until_reset % 60;
  
    return (
      <div className="text-sm text-gray-600 text-center mt-2">
        {requests_remaining > 0 ? (
          <span>{requests_remaining} questions remaining this session</span>
        ) : seconds_until_reset > 0 ? (
          <span>Rate limit reached. Try again in {minutes}m {seconds}s</span>
        ) : null}
      </div>
    );
  };