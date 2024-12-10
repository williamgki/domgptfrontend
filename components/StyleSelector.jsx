import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const StyleSelector = ({ onStyleChange }) => {
  return (
    <div className="w-72 mb-4">
      <Select onValueChange={onStyleChange} defaultValue="blog">
        <SelectTrigger className="w-full bg-white/90 backdrop-blur-sm">
          <SelectValue placeholder="Select Dom's style" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="blog">Blog Dom</SelectItem>
          <SelectItem value="twitter">Twitter Dom</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default StyleSelector;