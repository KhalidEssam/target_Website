import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  Typography, 
  Box, 
  Chip, 
  Avatar, 
  Stack, 
  IconButton, 
  Collapse,
  styled 
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const OrderSummary = ({ order }) => {
  const [expanded, setExpanded] = useState(false);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'warning';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'info';
    }
  };

  const getPaymentColor = (status) => {
    return status === 'paid' ? 'success' : 'error';
  };

  return (
    <StyledCard>
      <CardHeader
        title={`Order #${order._id.substring(0, 8)}`}
        subheader={new Date(order.createdAt).toLocaleDateString() }
        avatar= {order.items[0]?.imageUrls[0] && (
            <Avatar
              src={order.items[0].imageUrls[0]}
              sx={{ width: 64, height: 64 }}
            />
          )}
        action={
          <IconButton onClick={() => setExpanded(!expanded)}>
            <ExpandMoreIcon sx={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }} />
          </IconButton>
        }
      />
      
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Stack spacing={3}>
            {/* Order Details */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Order Details
              </Typography>
              
              <Stack direction="row" spacing={2} flexWrap="wrap">
                <Box sx={{ minWidth: '50%' }}>
                  <Typography variant="body2" color="textSecondary">
                    Order Type:
                  </Typography>
                  <Typography variant="body1">
                    {order.type}
                  </Typography>
                </Box>
                
                <Box sx={{ minWidth: '50%' }}>
                  <Typography variant="body2" color="textSecondary">
                    Order Mode:
                  </Typography>
                  <Typography variant="body1">
                    {order.orderMode}
                  </Typography>
                </Box>
                
                <Box sx={{ minWidth: '50%' }}>
                  <Typography variant="body2" color="textSecondary">
                    Status:
                  </Typography>
                  <Chip
                    label={order.status}
                    color={getStatusColor(order.status)}
                    size="small"
                  />
                </Box>
                
                <Box sx={{ minWidth: '50%' }}>
                  <Typography variant="body2" color="textSecondary">
                    Payment Status:
                  </Typography>
                  <Chip
                    label={order.paymentStatus}
                    color={getPaymentColor(order.paymentStatus)}
                    size="small"
                  />
                </Box>
              </Stack>
            </Box>

            {/* Items */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Items ({order.items.length})
              </Typography>
              
              {order.items.map((item, index) => (
                <Box key={item._id} mb={2}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box>
                      {item.imageUrls[0] && (
                        <Avatar
                          src={item.imageUrls[0]}
                          sx={{ width: 64, height: 64 }}
                        />
                      )}
                    </Box>
                    <Stack spacing={1}>
                      <Typography variant="body1">
                        {item.description}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {item.type}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Quantity: {item.quantity}
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
              ))}
            </Box>

            {/* Price Summary */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Price Summary
              </Typography>
              <Stack direction="row" spacing={2}>
                <Box>
                  <Typography variant="body2" color="textSecondary">
                    Total Amount:
                  </Typography>
                  <Typography variant="body1">
                    ${order.totalAmount}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="textSecondary">
                    Paid Amount:
                  </Typography>
                  <Typography variant="body1">
                    ${order.paidAmount}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Collapse>
    </StyledCard>
  );
};

const UserOrderCard = ({ orders }) => {
  return (
    <Box>
      {orders.map((order, index) => (
        <OrderSummary key={order._id} order={order} />
      ))}
    </Box>
  );
};

export default UserOrderCard;
